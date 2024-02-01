"use server";
import { hash } from "bcryptjs";
import { AuthActionResponse, SafeUser } from "../../../types";
import * as z from "zod";
import { RegisterSchema } from "@/schemas/RegisterSchema";
import { database } from "@/lib/database";
import { signIn } from "@/actions/auth/signin";

export const register = async (
  credentials: z.infer<typeof RegisterSchema>,
): Promise<AuthActionResponse> => {
  const validatedFields = RegisterSchema.safeParse(credentials);

  if (!validatedFields.success) return { error: "Invalid Fields" };

  const { email, password, name } = validatedFields.data;
  if (!email) return { error: "Invalid body" };

  const hashedPassword = await hash(password, 12);

  const existingUser = await database.getUserByEmail(email);

  if (existingUser) return { error: "User already exists" };

  try {
    const user = await database.createUser({
      email,
      name,
      password: hashedPassword,
      emailVerified: null,
      image: null,
    });

    return { success: "User created" };
  } catch (error) {
    console.log(error);
    return { error: "An error occurred" };
  }
};
