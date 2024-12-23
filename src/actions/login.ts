"use server";

import { signIn } from "@/auth";

const credentialsLogin = async (email: string, password: string) => {
  try {
    const response = await signIn("credentials", {
      email,
      password,
      // redirectTo: "/",
      redirect: false,
    });
    return response;
  } catch (err) {
    console.error("Server-side login error:", err);
    throw err;
  }
};

export { credentialsLogin };
