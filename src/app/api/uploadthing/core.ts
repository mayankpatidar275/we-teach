import { isPublisher } from "@/lib/publisher";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@/auth";
import { NextApiRequest, NextApiResponse } from "next";
// import {auth} from "@clerk/nextjs"

const f = createUploadthing();

const _auth = async (req: any, res: any) => {
  const session = await auth(req, res);
  return session?.user;
}; // Fake auth function

async function handleAuth({ req, res }: any) {
  // This code runs on your server before upload
  const user = await _auth(req, res);

  // To protect our backend
  // const userId = "1";
  const userId = user?.id;
  const userMail = user?.email;

  const isAuthorized = isPublisher(userMail, userId);

  // If you throw, the user will not be able to upload
  if (!user || !isAuthorized) throw new UploadThingError("Unauthorized");

  // Whatever is returned here is accessible in onUploadComplete as `metadata`
  return { userId: userId };
}

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req, res }) => {
      // This code runs on your server before upload
      const user = await _auth(req, res);
      const userId = user?.id;

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: userId };
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
