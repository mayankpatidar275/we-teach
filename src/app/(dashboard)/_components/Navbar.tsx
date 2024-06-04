import React from "react";
import MobileNav from "./MobileNav";
import NavbarRoutes from "../../../components/NavbarRoutes";

function Navbar() {
  return (
    <div className="flex items-center h-full justify-between">
      <MobileNav />
      <NavbarRoutes />
    </div>
  );
}

export default Navbar;
