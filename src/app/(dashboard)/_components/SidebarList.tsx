"use client";

import { LayoutDashboard, Navigation, Settings2 } from "lucide-react";
import React from "react";
import SidebarItem from "./SidebarItem";
import { usePathname } from "next/navigation";

const playerRoutes = [
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
    href: "/funzone",
    label: "FunZone",
  },
];

const publisherRoutes = [
  {
    icon: LayoutDashboard,
    href: "/publisher/courses",
    label: "Courses",
  },
  {
    icon: Navigation,
    href: "/publisher/analytics",
    label: "Analytics",
  },
  {
    icon: Settings2,
    href: "/publisher/me",
    label: "Profile",
  },
];

function SidebarList(): React.ReactNode {
  const pathname = usePathname();
  const routes = pathname.startsWith("/publisher")
    ? publisherRoutes
    : playerRoutes;

  return (
    <div>
      {routes.map((item) => (
        <SidebarItem key={item.label} {...item} />
      ))}
    </div>
  );
}

export default SidebarList;
