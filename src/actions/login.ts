"use server";

import { signIn } from "@/auth";

const credentialsLogin = async (email: string, password: string) => {
  try {
    console.log("Inside credentialsLogin")
    const response = await signIn("credentials", {
      email,
      password,
      // redirectTo: "/",
      redirect: false,
    });
    console.log("After signIn");
    console.log("Server-side login response:", response);
    return response;
  } catch (err) {
    console.log("Catching the Server-side login error:")
    console.error("Server-side login error:", err);
    throw err;
  }
};

export { credentialsLogin };
