"use server";

import { SignInSchema } from "@/schemas/SignInSchema";
import * as z from "zod";
import { signIn as authSignIn } from "@/auth";
import { AuthError } from "next-auth";

export const signIn = async (credentials: z.infer<typeof SignInSchema>) => {
  const validatedFields = SignInSchema.safeParse(credentials);

  if (!validatedFields.success) return { error: "Invalid fields" };

  const { email, password } = validatedFields.data;

  try {
    await authSignIn("credentials", {
      redirectTo: "/",
      email,
      password,
    });
  } catch (e) {
    if (e instanceof AuthError) {
      switch (e.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
      }
    }
    throw e;
  }
};
