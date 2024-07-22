"use client";

import React from "react";
import Logo from "./Logo";
import SidebarList from "./SidebarList";
import { cn } from "@/lib/utils";
import { SessionProvider, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Loader2 } from "lucide-react";
import LoginLogoutBtn from "./LoginLogoutBtn";

function Sidebar(): React.ReactNode {
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
      <SessionProvider
        // Re-fetches session when window is focused
        refetchOnWindowFocus={true}
      >
        <LoginLogoutBtn />
      </SessionProvider>
      {/* <nav className={cn("block text-end p-5 mt-auto")}>
        {status === "loading" ? (
          <div className="flex items-center justify-end p-3">
            <Loader2 className="h-6 w-6 animate-spin text-secondary" />
          </div>
        ) : status === "authenticated" ? (
          <Button onClick={() => signOut()} variant="default">
            Logout
          </Button>
        ) : status === "unauthenticated" ? (
          <Link href="/sign-in">
            <Button variant="secondary">Login</Button>
          </Link>
        ) : (
          ""
        )}
      </nav> */}
    </div>
  );
}

export default Sidebar;
