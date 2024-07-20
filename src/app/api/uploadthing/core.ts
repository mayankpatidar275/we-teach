import { isPublisher } from "@/lib/publisher";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@/auth";

const f = createUploadthing();

const _auth = async () => {
  try {
    const session = await auth();
    return session?.user;
  } catch (error) {
    console.error("Authentication error:", error);
    throw new UploadThingError("Authentication failed");
  }
};

async function handleAuth() {
  try {
      // This code runs on your server before upload

    const user = await _auth();

    if (!user) {
      console.error("Unauthorized access attempt");
      throw new UploadThingError("Unauthorized");
    }

    const userId = user.id;
    const userMail = user.email;
    const isAuthorized = isPublisher(userId, userMail);

    if (!isAuthorized) {
      console.error("User not authorized:", userId, userMail);
      throw new UploadThingError("Unauthorized");
    }

    return { userId };
  } catch (error) {
    console.error("Authorization error:", error);
    throw error;
  }
}

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req, res }) => {
      try {
        // This code runs on your server before upload

        const user = await _auth();
      // If you throw, the user will not be able to upload

        if (!user) throw new UploadThingError("Unauthorized");
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
        const userId = user.id;
        return { userId };
      } catch (error) {
        console.error("Middleware error:", error);
        throw error;
      }
    })
    .onUploadComplete(() => {
      console.log("Upload complete: courseImage");
    }),
  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(handleAuth)
    .onUploadComplete(() => {
      console.log("Upload complete: courseAttachment");
    }),
  chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
    .middleware(handleAuth)
    .onUploadComplete(() => {
      console.log("Upload complete: chapterVideo");
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
