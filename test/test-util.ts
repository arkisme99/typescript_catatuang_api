import { prismaClient } from "../src/application/database";
import bcrypt from "bcrypt";
import { ResponseError } from "../src/error/response-error";

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

export class CategoryTest {
  static async deleteAll() {
    await prismaClient.category.deleteMany({
      where: {
        user_id: (await UserTest.get()).id,
      },
    });
  }

  static async create() {
    const user = await UserTest.get();

    const category = await prismaClient.category.create({
      data: {
        name: "Gaji Kantor",
        type: "income",
        user_id: user.id,
      },
    });

    return category;
  }

  static async get() {
    const user = await UserTest.get();
    const category = await prismaClient.category.findFirst({
      where: {
        user_id: user.id,
      },
    });

    if (!category) throw new ResponseError(404, "Category not found");

    return category;
  }
}

export class TransactionTest {
  static async deleteAll() {
    await prismaClient.transaction.deleteMany({
      where: {
        user_id: (await UserTest.get()).id,
      },
    });
  }
}
