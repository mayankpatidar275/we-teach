"use client";

import toast from "react-hot-toast";
// import { toast } from "sonner";
import { Button } from "../button";
import { Input } from "../input";
import { Label } from "../label";
import { credentialsLogin } from "@/actions/login";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  return (
    <form
      action={async (formData) => {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!email || !password)
          return toast.error("Please provide all fields");

        try {
          const response = await credentialsLogin(email, password);
          if (!!response.error) {
            // console.error(response.error);
            toast.error("Check your credentials");
            // setError(response.error.message);
          } else {
            router.push("/");
          }
        } catch (e) {
          toast.error("Check your credentials");
        }
      }}
    >
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" placeholder="demo" />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="demo@gmail.com"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Button type="submit">Login</Button>
        </div>
      </div>
    </form>
  );
};

export { LoginForm };
