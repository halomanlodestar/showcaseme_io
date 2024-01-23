import { User } from ".prisma/client";

interface SafeUser extends Omit<User, "password"> {}
