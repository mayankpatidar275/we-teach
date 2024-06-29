import React from "react";
import { auth } from "@/auth";
import { isPublisher } from "@/lib/publisher";

async function ProfilePage() {
  const session = await auth();
  const userId = session?.user?.id;
  const userEmail = session?.user?.email;
  return (
    <div className="p-10">
      <h1 className="text-2xl mb-4">Hey, Welcome to WeTeach </h1>
      <h2>Your email: {userEmail}</h2>
      <h2>Your userId: {userEmail}</h2>
      {isPublisher(userId, userEmail) ? (
        <h2>You are the publisher</h2>
      ) : (
        <h2>You are not the publisher yet</h2>
      )}
    </div>
  );
}

export default ProfilePage;
