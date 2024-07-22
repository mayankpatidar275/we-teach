import { createRouteHandler } from "uploadthing/next";
 
import { ourFileRouter } from "./core";
 
// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
 
  // Apply an (optional) custom config:
  // config: { ... },
    config: {
    callbackUrl: "https://we-teach.mkpatidar.in",
    uploadthingId: process.env.UPLOADTHING_APP_ID,
    uploadthingSecret: process.env.UPLOADTHING_SECRET,
    logLevel: "info",
    // isDev: process.env.NODE_ENV === "development" || process.env.NODE_ENV === "dev",
    fetch: globalThis.fetch,
  },
});