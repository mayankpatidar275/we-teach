"use client";

import React from "react";
import Logo from "./Logo";
import SidebarList from "./SidebarList";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signOut } from "next-auth/react";

function Sidebar(): React.ReactNode {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  return (
    <div
      className={
        "md:flex flex-col w-full md:w-60 h-full py-2 bg-slate-700 shadow-lg shadow-slate-700"
      }
    >
      <div className={cn("p-6")}>
        <Logo />
      </div>
      <div>
        <SidebarList />
      </div>
      <nav className={cn("block text-end p-5 mt-auto")}>
        {session?.user?.id ? (
          <Button onClick={() => signOut()} variant="default">
            Logout
          </Button>
        ) : (
          <Link href="/sign-in">
            <Button variant="secondary">Login</Button>
          </Link>
        )}
      </nav>
    </div>
  );
}

export default Sidebar;
