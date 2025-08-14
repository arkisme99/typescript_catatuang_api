import supertest from "supertest";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";
import { UserTest } from "./test-util";
import bcrypt from "bcrypt";

describe("POST /api/auth/register", () => {
  afterEach(async () => {
    await UserTest.delete();
  });

  it("should reject register new user if request is invalid", async () => {
    const response = await supertest(web).post("/api/auth/register").send({
      username: "",
      name: "",
      password: "",
      email: "john",
    });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBeDefined();
    expect(response.body.errors).toBeDefined();
  });

  it("should register new user", async () => {
    const response = await supertest(web).post("/api/auth/register").send({
      username: "test",
      name: "Test Doe",
      password: "secret123",
    });

    logger.debug(response.body);
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBeDefined();
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("Test Doe");
  });
});

describe("POST /api/auth/login", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await UserTest.delete();
  });

  it("should reject login if username is wrong", async () => {
    const response = await supertest(web).post("/api/auth/login").send({
      username: "wrong",
      password: "test",
    });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBeDefined();
    expect(response.body.errors).toBeNull();
  });

  it("should reject login if password is wrong", async () => {
    const response = await supertest(web).post("/api/auth/login").send({
      username: "test",
      password: "wrong",
    });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBeDefined();
    expect(response.body.errors).toBeNull();
  });

  it("should success login", async () => {
    const response = await supertest(web).post("/api/auth/login").send({
      username: "test",
      password: "test",
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBeDefined();
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("Test Doe");
    expect(response.body.data.token).toBeDefined();
  });
});

describe("GET /api/auth/profile", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await UserTest.delete();
  });

  it("should be success get profile", async () => {
    const response = await supertest(web).get("/api/auth/profile").set({
      "X-API-TOKEN": "test",
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBeDefined();
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("Test Doe");
  });

  it("should be reject get profile if token invalid", async () => {
    const response = await supertest(web).get("/api/auth/profile").set({
      "X-API-TOKEN": "salah",
    });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Unauthorized");
    expect(response.body.errors).toBeNull();
  });
});

describe("PATCH /api/auth/profile", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await UserTest.delete();
  });

  it("should be rejected update profile if request invalid", async () => {
    const response = await supertest(web)
      .patch("/api/auth/profile")
      .set({
        "X-API-TOKEN": "test",
      })
      .send({
        name: "",
        email: "",
        password: "",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBeDefined();
    expect(response.body.errors).toBeDefined();
  });

  it("should be able rejected update profile if token invalid", async () => {
    const response = await supertest(web)
      .patch("/api/auth/profile")
      .set({
        "X-API-TOKEN": "salah",
      })
      .send({
        name: "John Doe Baru",
      });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Unauthorized");
    expect(response.body.errors).toBeNull();
  });

  it("should be able success update profile only name", async () => {
    const response = await supertest(web)
      .patch("/api/auth/profile")
      .set({
        "X-API-TOKEN": "test",
      })
      .send({
        name: "John Doe Baru",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBeDefined();
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("John Doe Baru");
  });

  it("should be able success update profile password and email", async () => {
    const response = await supertest(web)
      .patch("/api/auth/profile")
      .set({
        "X-API-TOKEN": "test",
      })
      .send({
        email: "john@new.com",
        password: "passwordbaru",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBeDefined();
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("Test Doe");
    expect(response.body.data.email).toBe("john@new.com");

    const user = await UserTest.get();
    expect(await bcrypt.compare("passwordbaru", user.password)).toBe(true);
  });
});

describe("DELETE /api/auth/logout", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await UserTest.delete();
  });

  it("should be able logout success", async () => {
    const response = await supertest(web).delete("/api/auth/logout").set({
      "X-API-TOKEN": "test",
    });

    logger.debug(response.body);

    const user = await UserTest.get();
    expect(user.token).toBeNull();

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeNull();
  });

  it("should reject logout if token is wrong", async () => {
    const response = await supertest(web).delete("/api/auth/logout").set({
      "X-API-TOKEN": "salah",
    });

    logger.debug(response.body);

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Unauthorized");
    expect(response.body.errors).toBeNull();
  });
});
