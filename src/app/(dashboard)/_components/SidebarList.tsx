"use client";

import { LayoutDashboard, Navigation, Settings2 } from "lucide-react";
import React from "react";
import SidebarItem from "./SidebarItem";

const routes = [
  {
    icon: LayoutDashboard,
    href: "/",
    label: "Dashboard",
  },
  {
    icon: Navigation,
    href: "/search",
    label: "Browse",
  },
  {
    icon: Settings2,
    href: "/settings",
    label: "Settings",
  },
];

function SidebarList(): React.ReactNode {
  return (
    <div>
      {routes.map((item) => (
        <SidebarItem key={item.label} {...item} />
      ))}
    </div>
  );
}

export default SidebarList;
