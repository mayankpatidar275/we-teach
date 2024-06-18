"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface SidebarItemProps {
  icon: LucideIcon;
  href: String;
  label: String;
}

function SidebarItem({
  icon: Icon,
  href,
  label,
}: SidebarItemProps): React.ReactNode {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    href === pathname ||
    pathname.startsWith(`${href}/`);

  function handleClick() {
    router.push(href.toString());
  }

  return (
    <button
      className={cn(
        "w-full flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive &&
          "bg-gray-200 text-black hover:bg-gray-300 hover:text-black border-r-4 border-sky-600"
      )}
      onClick={handleClick}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn("text-slate-500", isActive && "text-slate-700")}
        />
        {label}
      </div>
      {/* <div
        className={cn(
          " opacity-0 bg-slate-800 h-full ml-auto w-2",
          isActive && " opacity-100"
        )}
      /> */}
    </button>
  );
}

export default SidebarItem;
