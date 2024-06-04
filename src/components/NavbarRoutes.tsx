"use client";

import React from "react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

function NavbarRoutes() {
  const pathname = usePathname();

  const isPublisher = pathname.startsWith("/publisher");
  const isPlayer = pathname.startsWith("/course");

  return (
    <div>
      {isPublisher ? (
        <Link href={"/"}>
          <Button>Exit</Button>
        </Link>
      ) : (
        <Link href={"/publisher/courses"}>
          <Button>Publisher mode</Button>
        </Link>
      )}
    </div>
  );
}

export default NavbarRoutes;
