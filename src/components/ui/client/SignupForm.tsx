"use client";

import { Button } from "../button";
import { Input } from "../input";
import { Label } from "../label";
import { redirect } from "next/navigation";
import { credentialsSignup } from "@/actions/signup";
import toast from "react-hot-toast";

const SignupForm = () => {
  return (
    <form
      action={async (formData) => {
        const username = formData.get("username") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!email || !password || !username)
          return toast.error("Please provide all fields");

        const toastId = toast.loading("Signing up");

        try {
          await credentialsSignup(username, email, password);
        } catch (error) {
          return toast.error("Something went wrong", { id: toastId });
        }

        toast.success("SignUp Successfull", { id: toastId });
        redirect("/sign-in");
      }}
    >
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="username">Username</Label>
          <Input
            name="username"
            id="username"
            placeholder="Username"
            defaultValue="demo"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            type="email"
            id="email"
            placeholder="demo@gmail.com"
            defaultValue="demo@gmail.com"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            name="password"
            id="password"
            placeholder="demo"
            defaultValue="demo"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Button type="submit">Sign Up</Button>
        </div>
      </div>
    </form>
  );
};

export default SignupForm;
