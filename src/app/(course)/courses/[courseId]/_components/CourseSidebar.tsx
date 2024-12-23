import { db } from "@/lib/db";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import CourseSidebarItem from "./CourseSidebarItem";
import CourseProgress from "@/components/CourseProgress";
import { auth } from "@/auth";
import Link from "next/link";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

const CourseSidebar = async ({ course, progressCount }: CourseSidebarProps) => {
  const session = await auth();
  const userId = session?.user?.id;
  // const userId = "1";
  if (!userId) {
    return redirect("/");
  }
  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
  });
  return (
    <div className="h-full flex flex-col w-full md:w-60 overflow-y-auto shadow-lg shadow-slate-700 bg-slate-700">
      <div className="p-8 flex flex-col border-b">
        <Link href={`/`}>
          <h1 className="font-semibold">{course.title}</h1>
        </Link>
        {purchase && (
          <div className="mt-10">
            <CourseProgress variant="default" value={progressCount} />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseSidebar;
