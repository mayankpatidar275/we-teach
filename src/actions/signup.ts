"use server";

import { db } from "@/lib/db";

const bcrypt = require("bcryptjs")
// const bcrypt = require("bcrypt");

const credentialsSignup = async (
  username: string,
  email: string,
  password: string
) => {
  const user = await db.user.findFirst({
    where: {
      email: email,
    },
  });
  if (user) throw Error("User already exists");

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
        isPublisher: false, // this is for future scalability, for now I have hardcoded a single userId/email to be publisher and to protect our frontend.
      },
    });
    // redirect("/login");      // redirect can not be use in try catch because it internally throws an error
  } catch (error) {
    throw Error("Something went wrong");
  }
};

export { credentialsSignup };
