"use client";

import React from "react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LogOut } from "lucide-react";
import SearchInput from "./SearchInput";
import { isPublisher } from "@/lib/publisher";

function NavbarRoutes() {
  const userId = "1";

  const pathname = usePathname();

  const isPublisherPage = pathname.startsWith("/publisher");
  const isPlayerPage = pathname.startsWith("/courses");
  const isSearchPage = pathname === "/search";

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block ml-72 text-black">
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
        ) : isPublisher(userId) ? (
          <Link href={"/publisher/courses"}>
            <Button>Publisher mode</Button>
          </Link>
        ) : null}
      </div>
    </>
  );
}

export default NavbarRoutes;
