import React from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu className="m-3" />
      </SheetTrigger>
      <div />
      <SheetContent side="left" className="p-0 bg-slate-600 border-0 ">
        <Sidebar layout={"mobile"} />
      </SheetContent>
    </Sheet>
  );
}

export default MobileNav;
