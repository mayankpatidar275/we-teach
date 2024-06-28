"use server";

import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";

const credentialsLogin = async (email: string, password: string) => {
  // try {
  await signIn("credentials", {
    email,
    password,
    redirectTo: "/",
  });

  // } catch (error) {
  //   console.log("error in login is: ", error);
  //   const err = error as CredentialsSignin;
  //   return err.message;
  // }
};

export { credentialsLogin };
