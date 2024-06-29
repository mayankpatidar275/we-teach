import NextAuth, { CredentialsSignin } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import { db } from "./lib/db";
// const bcrypt = require("bcrypt");
import { compare } from "bcrypt"; // causing issues

interface CustomToken {
  userId: string;
  // other fields if needed
}

interface CustomUser {
  id: string;
  // other fields if needed
}

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

        const isPasswordCorrect = await compare(password, user.password);

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
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        // token.username = user.username;
      }
      return token;
    },
    async session({ token, user, session }) {
      if (token) {
        session.user.id = token.userId as string;
        console.log("typeof token:  ", token);
      }
      return session;
    },
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
