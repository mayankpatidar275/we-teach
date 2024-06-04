import React, { Children } from "react";
import Sidebar from "./_components/Sidebar";
import { cn } from "@/lib/utils";
import Navbar from "./_components/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

function DashboardLayout({ children }: LayoutProps): React.ReactNode {
  return (
    <div className={cn("h-full")}>
      <div
        className={cn("absolute top-0 h-16 w-full p-2 shadow-md bg-slate-800")}
      >
        <Navbar />
      </div>
      <div className={cn("h-full flex")}>
        <div className={cn("h-full z-10")}>
          <Sidebar layout={"desktop"} />
        </div>
        <main className={cn("md:pl-6 pl-4 pt-20")}>{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;
