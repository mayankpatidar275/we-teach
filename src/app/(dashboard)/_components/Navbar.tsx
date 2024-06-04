import React from "react";
import MobileNav from "./MobileNav";
import NavbarRoutes from "./NavbarRoutes";

function Navbar() {
  return (
    <div className="flex items-center h-full">
      <MobileNav />
      <NavbarRoutes />
    </div>
  );
}

export default Navbar;
