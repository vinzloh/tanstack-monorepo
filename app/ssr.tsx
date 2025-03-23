// app/ssr.tsx
import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/react-start/server";
import { getRouterManifest } from "@tanstack/react-start/router-manifest";

import { createRouter } from "./router";
console.log(`ssr: B4 createStartHandler`);
export default createStartHandler({
  createRouter,
  getRouterManifest,
})(defaultStreamHandler);
console.log(`ssr: AFTER createStartHandler`);
