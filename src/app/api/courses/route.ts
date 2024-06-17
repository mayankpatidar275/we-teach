import { db } from "@/lib/db";
import { isPublisher } from "@/lib/publisher";
import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs";

export async function POST(req: Request) {
  try {
    // const {userId} = auth();
    const userId = "1";
    const { title } = await req.json();

    // In case if someone bypass the frontend and use the api (protecting using isPublisher)
    if (!userId || !isPublisher(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.create({
      data: {
        userId,
        title,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    return new NextResponse("Internal error ", { status: 500 });
  }
}
