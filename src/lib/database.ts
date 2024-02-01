import { PrismaClient } from "@prisma/client";
import { User } from ".prisma/client";

class Database {
  public readonly prisma;
  private static instance: Database;
  private constructor() {
    this.prisma = new PrismaClient();
  }

  public static getInstance(): Database {
    return this.instance ? this.instance : new Database();
  }

  public async createUser(user: Omit<User, "id">) {
    try {
      const returned = await this.prisma.user.create({ data: user });
    } catch (error) {
      console.log(error);
    }
  }

  public async getUserById(id: string) {
    let user;

    try {
      user = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.log(error);
    }

    return user || null;
  }

  public async getUserByEmail(email: string) {
    let user;
    try {
      user = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });
    } catch (error) {
      console.log(error);
    }

    return user || null;
  }
}

export const database = Database.getInstance();
