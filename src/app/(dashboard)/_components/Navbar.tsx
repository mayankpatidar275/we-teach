import React from "react";
import MobileNav from "./MobileNav";
import NavbarRoutes from "../../../components/NavbarRoutes";

function Navbar() {
  return (
    <div className="flex items-center h-full p-5 justify-between bg-slate-800 ">
      <MobileNav />
      <NavbarRoutes />
    </div>
  );
}

export default Navbar;
