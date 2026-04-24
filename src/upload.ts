import type { FileRouter } from "@silo-storage/sdk-server";
import { createSiloUpload } from "@silo-storage/sdk-server";

export type UploadContext = object;

const f = createSiloUpload<Request, UploadContext>();

export const fileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 4,
    },
  })
    .expires("30 minutes") // delete after 30 days
    .public(false) // do we need a signed url to access?
    .serveImage(true) // serve images from the image CDN (transformations etc)
    .onUploadComplete(async ({ file, core }) => {
      return {
        fileKeyId: file.fileKeyId,
        url: await core.generateImageUrl(file.accessKey),
        test: "hello",
      };
    }),
} satisfies FileRouter<Request, UploadContext>;

export type AppFileRouter = typeof fileRouter;