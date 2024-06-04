import React, { Children } from "react";
import Sidebar from "./_components/Sidebar";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps): React.ReactNode {
  return (
    <div className={cn("h-[100%] flex")}>
      <div className={cn("h-[100%]")}>
        <Sidebar />
      </div>
      <main className={cn("md:pl-6")}>{children}</main>
    </div>
  );
}

export default Layout;
