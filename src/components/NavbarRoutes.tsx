"use client";

import React from "react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LogOut } from "lucide-react";
import SearchInput from "./SearchInput";

function NavbarRoutes() {
  const pathname = usePathname();

  const isPublisher = pathname.startsWith("/publisher");
  const isPlayer = pathname.startsWith("/course");
  const isSearchPage = pathname === "/search";

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isPublisher || isPlayer ? (
          <Link href={"/"}>
            <Button>
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : (
          <Link href={"/publisher/courses"}>
            <Button>Publisher mode</Button>
          </Link>
        )}
      </div>
    </>
  );
}

export default NavbarRoutes;
