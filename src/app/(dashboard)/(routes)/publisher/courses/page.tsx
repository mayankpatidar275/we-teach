import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function CoursesPage() {
  return (
    <div>
      <Link href={"/publisher/create"}>
        <Button>Create course</Button>
      </Link>
    </div>
  );
}

export default CoursesPage;
