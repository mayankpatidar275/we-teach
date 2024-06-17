// To protect our frontend

import { isPublisher } from "@/lib/publisher";
import { redirect } from "next/navigation";

const TeacherLayout = ({ children }: { children: React.ReactNode }) => {
  const userId = "1";
  if (!isPublisher(userId)) {
    return redirect("/");
  }
  return <>{children}</>;
};

export default TeacherLayout;
