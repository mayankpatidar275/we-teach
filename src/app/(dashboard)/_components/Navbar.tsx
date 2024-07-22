import React from "react";
import MobileNav from "./MobileNav";
import NavbarRoutes from "../../../components/NavbarRoutes";
import { SessionProvider } from "next-auth/react";

function Navbar() {
  return (
    <SessionProvider>
      <div className="flex items-center h-full p-5 justify-between bg-slate-800 ">
        <MobileNav />
        <NavbarRoutes />
      </div>
    </SessionProvider>
  );
}

export default Navbar;
