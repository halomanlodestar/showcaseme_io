import NextAuth, { AuthOptions } from "next-auth";
import { prisma } from "../../../../../prisma/prismaClient";
import { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { SafeUser } from "../../../../../types";

export const authOptions: AuthOptions = {
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/account/signin",
    error: "/account/error",
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, context) {
        if (!credentials!.email || !credentials!.password) return null;

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials!.email,
            },
          });

          const isValidPassword = await compare(
            credentials!.password,
            user!.password,
          );

          if (!isValidPassword) {
            console.log("Invalid Credentials");
            return null;
          }

          return user as SafeUser;
        } catch (e) {
          console.log(e);
          throw new Error(e + "");
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
