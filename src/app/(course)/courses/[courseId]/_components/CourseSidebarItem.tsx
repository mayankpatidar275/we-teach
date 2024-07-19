"use client";

import { cn } from "@/lib/utils";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface CourseSidebarItemProps {
  label: string;
  id: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
}

const CourseSidebarItem = ({
  label,
  id,
  isCompleted,
  courseId,
  isLocked,
}: CourseSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const Icon = isLocked ? Lock : isCompleted ? CheckCircle : PlayCircle;
  const isActive = pathname?.includes(id);

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  };
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive &&
          "bg-gray-200 text-black hover:bg-gray-300 hover:text-black  border-r-4 border-sky-600",
        isCompleted &&
          "text-emerald-700 hover:text-emerald-700 border-r-4 border-emerald-700",
        isCompleted && isActive && "bg-emerald-200/20"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            "text-slate-50",
            isActive && "text-slate-700",
            isCompleted && "text-emerald-700"
          )}
        />
        <span
          className={cn(
            "text-slate-50",
            isActive && "text-slate-700",
            isCompleted && "text-emerald-700"
          )}
        >
          {label.length > 15 ? `${label.slice(0, 15)}...` : label}
        </span>
      </div>
      {/* <div
        className={cn(
          "ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
          isActive && "opacity-100",
          isCompleted && "border-emerald-700"
        )}
      /> */}
    </button>
  );
};

export default CourseSidebarItem;
