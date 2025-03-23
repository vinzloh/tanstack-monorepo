import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";

export const APIRoute = createAPIFileRoute("/api/file/$")({
  GET: async ({ request, params }) => {
    const r = new URL(request.url);
    console.log(r.searchParams.get("embed"));
    return json({ message: 'Hello "/api/file/$"!' + params._splat });
  },
});
