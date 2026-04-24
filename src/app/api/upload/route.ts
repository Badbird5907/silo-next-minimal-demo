import { createSiloCoreFromToken } from "@silo-storage/sdk-core";
import { createRouteHandler } from "@silo-storage/sdk-next";

import type { UploadContext } from "@/upload";
import { fileRouter } from "@/upload";

const core = createSiloCoreFromToken({
  url: process.env.SILO_URL!,
  token: process.env.SILO_TOKEN!,
  cdnHost: process.env.NEXT_PUBLIC_SILO_CDN!,
});

const handlers = createRouteHandler<UploadContext>({
  router: fileRouter,
  core,
});

export const GET = handlers.GET;
export const POST = handlers.POST;