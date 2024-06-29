// To protect our frontend

import { auth } from "@/auth";
import { isPublisher } from "@/lib/publisher";
import { redirect } from "next/navigation";

const PublisherLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  const userId = session?.user?.id;
  const userMail = session?.user?.email;

  if (!session) {
    return redirect("/");
  }

  if (!isPublisher(userId, userMail)) {
    return redirect("/");
  }
  return <>{children}</>;
};

export default PublisherLayout;
