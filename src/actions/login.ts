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
    throw err;
  }
};

export { credentialsLogin };
