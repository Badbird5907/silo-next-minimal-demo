"use client";

import { useState } from "react";

import { UploadButton, UploadDropzone, useUpload } from "@/lib/upload";

type Completion = {
  fileKeyId: string;
  result: { fileKeyId: string, url: string };
};

export function UploadClient() {
  const [completions, setCompletions] = useState<Completion[]>([]);
  const [lastError, setLastError] = useState<string | null>(null);

  const upload = useUpload({
    endpoint: "imageUploader",
    accept: ["image/jpeg", "image/png"],
    onComplete: (results) => {
      setLastError(null);
      console.log(results);
      setCompletions((prev) => [
        ...prev,
        ...results.map((r) => ({
          fileKeyId: r.fileKeyId,
          result: {
            fileKeyId: r.fileKeyId,
            url: r.result.url,
          },
        })),
      ]);
    },
    onError: (err) => {
      setLastError(err.message);
    },
  });

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          Silo upload
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Drop images or use the button. Route:{" "}
          <code className="rounded bg-zinc-200 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
            imageUploader
          </code>{" "}
          →{" "}
          <code className="rounded bg-zinc-200 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
            /api/upload
          </code>
        </p>
      </div>

      <UploadDropzone
        upload={upload}
        clickable
        className="flex min-h-[160px] cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50/80 text-center text-sm text-zinc-600 transition-colors data-[dragging=true]:border-sky-500 data-[dragging=true]:bg-sky-50 dark:border-zinc-600 dark:bg-zinc-900/50 dark:text-zinc-400 dark:data-[dragging=true]:border-sky-400 dark:data-[dragging=true]:bg-sky-950/40"
      >
        <div>
          <p className="font-medium text-zinc-800 dark:text-zinc-200">
            Drop images here
          </p>
          <p className="mt-1 text-xs">or click to pick files (images)</p>
        </div>
      </UploadDropzone>

      <div className="flex items-center justify-center">
        <UploadButton upload={upload} multiple>
          <button
            type="button"
            className="rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          >
            Choose files
          </button>
        </UploadButton>
      </div>

      {upload.isUploading && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Uploading… {upload.progress.aggregatePercent}%
        </p>
      )}

      {lastError && (
        <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-950/50 dark:text-red-200">
          {lastError}
        </p>
      )}

      {completions.length > 0 && (
        <div>
          <h2 className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Completed uploads
          </h2>
          <ul className="space-y-1 font-mono text-xs text-zinc-800 dark:text-zinc-200">
            {completions.map((c, i) => (
              <li key={`${c.fileKeyId}-${i}`} className="break-all">
                {c.fileKeyId}
                <img src={c.result.url} alt={c.fileKeyId} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
