import { AuthError, NextAuthConfig } from "next-auth";
import Credentials from "@auth/core/providers/credentials";
import { database } from "@/lib/database";
import { SafeUser } from "../types";
import { compare } from "bcryptjs";
import { SignInSchema } from "@/schemas/SignInSchema";

export default {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validatedFields = SignInSchema.safeParse(credentials);
        if (!validatedFields.success) return null;

        const { email, password } = validatedFields.data;

        try {
          const user = await database.getUserByEmail(email);

          if (!user) return null;

          const isValidPassword = await compare(password, user.password!);

          if (!isValidPassword) {
            console.log("Invalid Credentials");
            return null;
          }

          return user as SafeUser;
        } catch (e) {
          if (e instanceof AuthError) {
          }

          throw e;
        }
      },
    }),
  ],
  pages: {
    signIn: "/account/signin",
  },
} satisfies NextAuthConfig;
