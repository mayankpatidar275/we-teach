"use client";

import { UploadDropzone } from "@/lib/uploadthings";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import toast from "react-hot-toast";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        console.log("Upload completed with response:", res);
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.error("Upload error:", error);
        toast.error(`Upload error: ${error?.message}`);
      }}
    />
  );
};
