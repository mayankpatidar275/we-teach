import { isPublisher } from "@/lib/publisher";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
// import {auth} from "@clerk/nextjs"

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

async function handleAuth({ req }: any) {
  // This code runs on your server before upload
  const user = await auth(req);

  // To protect our backend
  const userId = "1";

  const isAuthorized = isPublisher(userId);

  // If you throw, the user will not be able to upload
  if (!user || !isAuthorized) throw new UploadThingError("Unauthorized");

  // Whatever is returned here is accessible in onUploadComplete as `metadata`
  return { userId: user.id };
}

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await auth(req);

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(() => {}),
  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(handleAuth)
    .onUploadComplete(() => {}),
  chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
    .middleware(handleAuth)
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
