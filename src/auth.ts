import NextAuth, { CredentialsSignin } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import { db } from "./lib/db";
// import { compare } from "bcrypt"; // causing issues

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password)
          throw new CredentialsSignin("Please fill all the fields");

        const user = await db.user.findFirst({ where: { email: email } });

        if (!user) {
          throw new CredentialsSignin("Invailid email");
        }

        if (!user.password) {
          throw new CredentialsSignin("Invailid email or password");
        }

        const bcrypt = require("bcrypt");
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
          throw new CredentialsSignin("Invalid password");
        }

        return { username: user.username, email: user.email, id: user.id }; // better not to send user directly because it has password
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/sign-in" },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    signIn: async ({ user, account }) => {
      //   if (account?.provider === "google") {
      //     try {
      //       const { email, name, image, id } = user;
      //       const alreadyUser = await User.findOne({ email });
      //       if (!alreadyUser)
      //         await User.create({ email, name, image, googleId: id });
      //       return true;
      //     } catch (error) {
      //       throw new AuthError("Error while creating user");
      //     }
      //   }
      if (account?.provider === "credentials") return true;
      return false;
    },
  },
});
