// app/routes/index.tsx
import * as fs from "node:fs";
import {
  createFileRoute,
  notFound,
  redirect,
  useRouter,
} from "@tanstack/react-router";
import { createMiddleware, createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const filePath = "count.txt";

const Count = z.number();

async function readCount() {
  return parseInt(
    await fs.promises.readFile(filePath, "utf-8").catch(() => "0")
  );
}

const logMidd = createMiddleware()
  //
  .client(async ({ next, context, data }) => {
    console.log("logMidd:client: Request sent:", data);
    const res = await next({ sendContext: { ali: 123 } });
    console.log("logMidd:client: Response received:", res);
    return res;
  })
  .server(async ({ next, context }) => {
    console.log("logMidd:server: Request received:", context);
    const res = await next();
    console.log("logMidd:server: Response processed:", res);
    return res;
  });

const kepoMidd = createMiddleware()
  .client(async ({ next, context, data }) => {
    console.log("kepoMidd:client: Request sent:", data);
    const res = await next({ sendContext: { baba: 456 } });
    console.log("kepoMidd:client: Response received:", res);
    return res;
  })
  .server(async ({ next, context }) => {
    console.log("kepoMidd:server: Request received:", context);
    const res = await next();
    console.log("kepoMidd:server: Response processed:", res);
    return res;
  });

const getCount = createServerFn({ method: "GET" })
  .validator((data: number) => data)
  //   .middleware([logMidd, kepoMidd])
  .handler(async (ctx) => {
    const res = await readCount();
    console.log(`serverFn getCount:`, res);
    return res;
  });

const updateCount = createServerFn({
  //
  method: "POST",
  response: "raw",
})
  .validator((formData) => {
    if (!(formData instanceof FormData)) {
      throw new Error("Invalid form data");
    }

    const addBy = formData.get("addBy");

    if (!addBy) {
      throw new Error("addBy is required");
    }

    return parseInt(addBy.toString());
  })
  .handler(async ({ data: addByAmount }) => {
    const count = await readCount();
    await fs.promises.writeFile(filePath, `${count + addByAmount}`);
    // Reload the page to trigger the loader again
    return new Response("ok", { status: 301, headers: { Location: "/" } });
  });

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => {
    console.log(`loader enter:`);
    const res = await getCount({ data: 99 });
    console.log(`loader result:`, res);
    return res;
  },
});

function Home() {
  const router = useRouter();
  const state = Route.useLoaderData();
  console.log(`Home`);
  return (
    <div>
      <button
        onClick={() => {
          router.invalidate();
        }}
      >
        reload
      </button>
      <form
        action={updateCount.url}
        method="POST"
        encType="multipart/form-data"
      >
        <input type="number" name="addBy" defaultValue="1" />
        <button type="submit">Add</button>
      </form>
      <pre>{state}</pre>
    </div>
  );
}
