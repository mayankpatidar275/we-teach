import React from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { SessionProvider } from "next-auth/react";

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu className="m-3" />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-slate-600 border-0 ">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}

export default MobileNav;
