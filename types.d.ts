import { User } from ".prisma/client";

interface User extends User {
  emailVerified?: string;
}

interface AuthActionResponse {
  error?: string;
  success?: string;
}

interface SafeUser extends Omit<User, "password"> {}
