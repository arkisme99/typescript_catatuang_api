import { prismaClient } from "../src/application/database";
import bcrypt from "bcrypt";

export class UserTest {
  static async delete() {
    await prismaClient.user.deleteMany({
      where: {
        username: "test",
      },
    });
  }

  static async create() {
    await prismaClient.user.create({
      data: {
        username: "test",
        name: "Test Doe",
        password: await bcrypt.hash("test", 10),
        token: "test", //token dihardcode untuk keperluan testing
      },
    });
  }

  static async get() {
    const user = await prismaClient.user.findFirst({
      where: {
        username: "test",
      },
    });

    if (!user) throw new Error("User not found");
    return user;
  }
}
