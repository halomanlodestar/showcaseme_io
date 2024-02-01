import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { database } from "@/lib/database";
export const {
  signIn,
  signOut,
  handlers: { POST, GET },
  auth,
} = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(database.prisma),
  session: { strategy: "jwt" },
});
