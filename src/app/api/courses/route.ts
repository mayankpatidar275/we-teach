import { db } from "@/lib/db";
import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs";

export async function POST(req: Request) {
  try {
    // const {userId} = auth();
    const userId = "1";
    const { title } = await req.json();

    if (!userId) {
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
