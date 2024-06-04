"use client";

import { Button } from "@/components/ui/button";
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
    <Button
      className={cn(
        "w-[100%] bg-slate-700 text-white p-6 flex gap-3",
        isActive &&
          "bg-gray-200 text-black hover:bg-gray-300 hover:text-black border-r-4 border-sky-600"
      )}
      onClick={handleClick}
    >
      <Icon />
      <p>{label}</p>
      <div
        className={cn(
          " opacity-0 bg-slate-800 h-full ml-auto w-2",
          isActive && " opacity-100"
        )}
      />
    </Button>
  );
}

export default SidebarItem;
