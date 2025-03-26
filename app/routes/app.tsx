import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from '@tanstack/react-router';

export const Route = createFileRoute('/app')({
  component: RouteComponent,
  beforeLoad(ctx) {
    throw redirect({ to: '/login' });
  },
});

function RouteComponent() {
  return (
    <div>
      <h1>Hello "/app"!</h1>
      <Link to="/app/dashboard">dashboard</Link>
      <Outlet />
    </div>
  );
}
