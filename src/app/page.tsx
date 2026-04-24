import { UploadClient } from "./upload-client";

export default function Home() {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-zinc-50 font-sans dark:bg-zinc-950">
      <UploadClient />
    </div>
  );
}
