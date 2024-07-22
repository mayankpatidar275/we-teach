import React from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const LoginLogoutBtn = () => {
  const { data: session, status } = useSession();

  return (
    <nav className={cn("block text-end p-5 mt-auto")}>
      {status === "loading" ? (
        <div className="flex items-center justify-end p-3">
          <Loader2 className="h-6 w-6 animate-spin text-secondary" />
        </div>
      ) : session ? (
        <Button onClick={() => signOut()} variant="default">
          Logout
        </Button>
      ) : (
        <Link href="/sign-in">
          <Button variant="secondary">Login</Button>
        </Link>
      )}
    </nav>
  );
};

export default LoginLogoutBtn;
