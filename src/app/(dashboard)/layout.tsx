import React, { Children } from "react";
import Sidebar from "./_components/Sidebar";
import Navbar from "./_components/Navbar";
import { SessionProvider } from "next-auth/react";

interface LayoutProps {
  children: React.ReactNode;
}

function DashboardLayout({ children }: LayoutProps): React.ReactNode {
  return (
    <SessionProvider>
      <div className="h-full">
        <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
          <Navbar />
        </div>
        <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
          <Sidebar />
        </div>
        <main className="md:pl-56 pt-[80px] h-full">{children}</main>
      </div>
    </SessionProvider>
  );
}

export default DashboardLayout;
