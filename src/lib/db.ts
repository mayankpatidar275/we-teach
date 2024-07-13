import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

// Ensure the Prisma client is disconnected when the process exits
process.on('exit', async () => {
  await db.$disconnect();
});

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
