import Mux from "@mux/mux-node";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
// import { auth } from "@clerk/nextjs";

const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    // const {userId} = auth();
    // const userId = "1";
    const session = await auth();
    const userId = session?.user?.id;
    // const { isPublished, ...values } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });
    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
    });

    if (!chapter) {
      return new NextResponse("Not Found", { status: 404 });
    }
    if (chapter.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: params.chapterId,
        },
      });

      if (existingMuxData) {
        await video.assets.delete(existingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }
    }
    const deletedChapter = await db.chapter.delete({
      where: {
        id: params.chapterId,
      },
    });

    const publishedChaptersInCourse = await db.chapter.findMany({
      where: {
        courseId: params.courseId,
        isPublished: true,
      },
    });

    if (!publishedChaptersInCourse.length) {
      await db.course.update({
        where: {
          id: params.courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    return NextResponse.json(deletedChapter);
  } catch (error) {
    console.log("[CHAPTER_ID_DELETE]", error);
    return new NextResponse("Internal error ", { status: 500 });
  }
}
export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    // const {userId} = auth();
    // const userId = "1";
    const session = await auth();
    const userId = session?.user?.id;
    const { isPublished, ...values } = await req.json();
    
    if (!userId) {
      console.log("Unauthorized: No user ID found");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });
    if (!courseOwner) {
      console.log("Unauthorized: Course owner not found");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
    });
    console.log("Chapter found:", chapter);

    if (!chapter) {
      console.log("Not Found: Chapter not found");
      return new NextResponse("Not Found", { status: 404 });
    }

    const updatedChapter = await db.chapter.update({
      where: {
        id: params.chapterId,
      },
      data: {
        ...values,
      },
    });

    if (values.videoUrl) {
      // delete if already exist (avoid filling up the storage)
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: params.chapterId,
        },
      });

      if (existingMuxData) {
        try {
          // Check if the asset exists before deleting
          const asset = await video.assets.retrieve(existingMuxData.assetId);
          if (asset) {
            console.log("Deleting existing Mux data:", existingMuxData.assetId);
            await video.assets.delete(existingMuxData.assetId);
            
          } else {
            console.log("Mux asset not found, skipping deletion.");
          }
        } catch (muxError) {
          console.log("Error checking/deleting Mux asset:", muxError);
          // if (muxError.status !== 404) {
          //   throw muxError; // rethrow if it's not a 404 error
          // } else {
          //   console.log("Mux asset not found, continuing with update.");
          // }
        }
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }

      const asset = await video.assets.create({
        input: values.videoUrl,
        playback_policy: ["public"],
        test: false,
      });

      await db.muxData.create({
        data: {
          chapterId: params.chapterId,
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0]?.id,
        },
      });
    }

    return NextResponse.json(updatedChapter);
  } catch (error) {
    console.log("[COURSES_CHAPTER_ID]", error);
    return new NextResponse("Internal error ", { status: 500 });
  }
}