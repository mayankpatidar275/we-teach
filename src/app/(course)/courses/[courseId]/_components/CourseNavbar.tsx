import NavbarRoutes from "@/components/NavbarRoutes";
import { Chapter, Course, UserProgress } from "@prisma/client";
import CourseMobileSidebar from "./CourseMobileSidebar";
import { SessionProvider } from "next-auth/react";

interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

const CourseNavbar = ({ course, progressCount }: CourseNavbarProps) => {
  return (
    <SessionProvider>
      <div className="p-4 h-full flex items-center bg-slate-800 shadow-sm">
        <CourseMobileSidebar course={course} progressCount={progressCount} />
        <NavbarRoutes />
      </div>
    </SessionProvider>
  );
};

export default CourseNavbar;
