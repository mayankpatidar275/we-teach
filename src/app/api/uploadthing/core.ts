import { isPublisher } from "@/lib/publisher";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@/auth";

const f = createUploadthing();

const _auth = async () => {
  const session = await auth();
  return session?.user;
};

async function handleAuth() {
  // This code runs on your server before upload
  const user = await _auth();

  if (!user) {
    console.error("Unauthorized access attempt"); // Log unauthorized access
    throw new UploadThingError("Unauthorized");
  }

  const userId = user.id;
  const userMail = user.email;
  const isAuthorized = isPublisher(userId, userMail);

  if (!isAuthorized) {
    console.error("User not authorized:", userId, userMail); // Log unauthorized user details
    throw new UploadThingError("Unauthorized");
  }

  return { userId };
}

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req, res }) => {
      // This code runs on your server before upload
      const user = await _auth();

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      const userId = user.id;
      return { userId };
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
