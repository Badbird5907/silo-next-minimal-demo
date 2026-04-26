import type { FileRouter } from "@silo-storage/sdk-server";
import { createSiloUpload } from "@silo-storage/sdk-server";
import { z } from "zod";

export type UploadContext = object;

const f = createSiloUpload<Request, UploadContext>();

export const fileRouter = {
  imageUploader: f(z.object({
    someValue: z.enum(["a", "b"]),
  }))
    .middleware(({ input }) => {
      if (input.someValue === "a") {
        return {
          someValue: "a",
        };
      }
      return {
        someValue: "b",
      };
    })
    .expects(({ input }) => {
      if (input.someValue === "a") {
        return {
          image: {
            mimeTypes: ["image/jpeg", "image/png"],
            maxFileSize: "1MB",
            maxFileCount: 1,
          }
        };
      }
      // b
      return {
        someOtherStuff: {
          mimeTypes: ["application/pdf", "application/json"],
          maxFileSize: "1MB",
          maxFileCount: 1,
        }
      };
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