import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed")({
  beforeLoad: (ctx) => {
    console.log(`AUTHED LEH`);
    throw redirect({ to: "/login" });
  },

  // component: RouteComponent,
});

// function RouteComponent() {
//   return <div>Hello "/authed"!</div>;
// }
