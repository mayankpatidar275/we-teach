"use client";

import React from "react";
import Logo from "./Logo";
import SidebarList from "./SidebarList";
import { cn } from "@/lib/utils";
// import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

function Sidebar({ layout }: { layout: String }): React.ReactNode {
  return (
    <div
      className={cn(
        "hidden md:flex flex-col w-full md:w-60 h-full py-2 bg-slate-700 shadow-lg shadow-slate-700",
        layout === "mobile" && "flex"
      )}
    >
      <div className={cn("p-6")}>
        <Logo />
      </div>
      <div>
        <SidebarList />
      </div>
      {/* <nav className={cn("block text-end p-5 mt-auto")}>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav> */}
    </div>
  );
}

export default Sidebar;
