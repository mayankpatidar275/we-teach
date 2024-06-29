"use client";

import React from "react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LogOut } from "lucide-react";
import SearchInput from "./SearchInput";
import { isPublisher } from "@/lib/publisher";
import { useSession } from "next-auth/react";

function NavbarRoutes() {
  // const userId = "1";
  const session = useSession();
  const userId = session?.data?.user?.id;
  const userMail = session?.data?.user?.email;

  const pathname = usePathname();

  const isPublisherPage = pathname.startsWith("/publisher"); // publisher is already protected
  const isPlayerPage = pathname.startsWith("/courses"); // courses layout is already protected
  const isSearchPage = pathname === "/search"; // search page already protected

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block ml-9 text-black">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isPublisherPage || isPlayerPage ? (
          <Link href={"/"}>
            <Button>
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isPublisher(userMail, userId) ? (
          <Link href={"/publisher/courses"}>
            <Button>Publisher mode</Button>
          </Link>
        ) : null}
      </div>
    </>
  );
}

export default NavbarRoutes;
