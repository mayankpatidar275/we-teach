import { auth, signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "@/components/ui/client/LoginForm";
import Link from "next/link";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await auth();
  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="flex justify-center items-center h-dvh">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Welcome,</CardTitle>
          <CardDescription>Login to the world of learnings...</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex justify-between flex-col gap-4">
          {/* <span>or</span>

          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <Button type="submit" variant="outline">
              Login with google
            </Button>
          </form> */}

          <Link href="/sign-up">Don&apos;t have an account? Signup</Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
