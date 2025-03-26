// app/routes/__root.tsx
import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import type { ReactNode } from 'react';

import '@/app/app.css';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  console.log(`__root: RootComponent`);

  return (
    <RootDocument>
      <Outlet />
      <TanStackRouterDevtools />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  console.log(`__root: RootDocument`);
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="flex gap-2">
          <Link to="/posts">posts</Link>
          <Link to="/app">app</Link>
        </div>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
