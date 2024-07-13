import NextAuth, { CredentialsSignin } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import { db } from "./lib/db";
const bcrypt = require("bcryptjs")
// const bcrypt = require("bcrypt");
// import { compare } from "bcrypt"; // causing issues


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
        console.log("authorize called with credentials:", credentials);
        if (credentials === null) return null; 
        try {
          const email = credentials.email as string | undefined;
          const password = credentials.password as string | undefined;
          
          if (!email || !password)
            throw new Error("Please fill all the fields");

          const user = await db.user.findFirst({ where: { email: credentials.email as string } });

          if (user) {
              console.log("User found:", user);
              if (!user.password) {
                console.log("Invailid email or password")
                throw new Error("Invailid email or password");
              }

              console.log("comparing password...")
              let isMatch = false;
              try {
                // isMatch = await compare(credentials.password as string, user.password);
                isMatch = await bcrypt.compare(credentials.password as string, user.password);
                console.log("after isMatch");
                console.log("isMatch is: ", isMatch);
              } catch (error) {
                  console.log("Password checking failed")
                  throw new Error("Password checking failed");
              }
              
              

              if (isMatch) {
                console.log("isMatch is true, returning this: ", { username: user.username, email: user.email, id: user.id })
                return { username: user.username, email: user.email, id: user.id }; // better not to send user directly because it has password
                  // return user;
              } else {
                  console.log("Email or Password is not correct")
                  throw new Error("Email or Password is not correct");
              }
          } else {
              throw new Error("User not found");
          }
      } catch (error) {
          console.error("Error during authorization:", error);
          throw new Error("Error authorizing");
      }
    },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/sign-in" },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      console.log("inside jwt callback")
      if (user) {
        token.userId = user.id;
        // token.username = user.username;
      }
      return token;
    },
    async session({ token, user, session }) {
      console.log("inside session callback")
      if (token) {
        session.user.id = token.userId as string;
      }
      return session;
    },
    signIn: async ({ user, account }) => {
      console.log("inside signIn callback")
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
