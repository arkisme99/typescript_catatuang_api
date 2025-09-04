import supertest from "supertest";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";
import { RefreshTokenTest, UserTest } from "./test-util";
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

  it("should block requests after exceeding the limit", async () => {
    // lakukan 3 request (limit = 3)
    for (let i = 0; i < 3; i++) {
      await supertest(web).post("/api/auth/register").send({
        username: "test",
        name: "Test Doe",
        password: "secret123",
      });

      await UserTest.delete();
    }

    // request ke-4 harus ditolak
    const response = await supertest(web).post("/api/auth/register").send({
      username: "test",
      name: "Test Doe",
      password: "secret123",
    });
    expect(response.status).toBe(429);
    expect(response.body).toHaveProperty(
      "error",
      "Terlalu banyak percobaan register. Coba lagi setelah 1 jam."
    );
  });
});

describe("POST /api/auth/login", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await RefreshTokenTest.deleteAll();
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

  it("should block requests after exceeding the limit", async () => {
    // lakukan 3 request (limit = 3)
    for (let i = 0; i < 3; i++) {
      await supertest(web).post("/api/auth/login").send({
        username: "test",
        password: "test",
      });
      // await RefreshTokenTest.deleteAll();
      // await UserTest.delete();
    }

    // request ke-4 harus ditolak
    const response = await supertest(web).post("/api/auth/login").send({
      username: "test",
      password: "test",
    });
    expect(response.status).toBe(429);
    expect(response.body).toHaveProperty(
      "error",
      "Terlalu banyak percobaan login. Coba lagi setelah 15 menit."
    );
  });
});

describe("GET /api/auth/profile", () => {
  let token: string;
  beforeEach(async () => {
    await UserTest.create();
    const login = await UserTest.login();
    token = await UserTest.getToken(login);
  });

  afterEach(async () => {
    await RefreshTokenTest.deleteAll();
    await UserTest.delete();
  });

  it("should be success get profile", async () => {
    const response = await supertest(web)
      .get("/api/auth/profile")
      .set("Authorization", `Bearer ${token}`);

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBeDefined();
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("Test Doe");
  });

  it("should be reject get profile if token invalid", async () => {
    const response = await supertest(web)
      .get("/api/auth/profile")
      .set("Authorization", `Bearer token-salah`);

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Unauthorized");
    expect(response.body.errors).toBeNull();
  });
});

describe("PATCH /api/auth/profile", () => {
  let token: string;
  beforeAll(async () => {
    // --> karena cukup 1x login saja setiap test, menghindari limit
    await UserTest.create();
    const login = await UserTest.login();
    token = await UserTest.getToken(login);
  });

  afterAll(async () => {
    await RefreshTokenTest.deleteAll();
    await UserTest.delete();
  });

  it("should be rejected update profile if request invalid", async () => {
    const response = await supertest(web)
      .patch("/api/auth/profile")
      .set("Authorization", `Bearer ${token}`)
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
      .set("Authorization", `Bearer token-salah`)
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
      .set("Authorization", `Bearer ${token}`)
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
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "john@new.com",
        password: "passwordbaru",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBeDefined();
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.email).toBe("john@new.com");
    const user = await UserTest.get();
    expect(await bcrypt.compare("passwordbaru", user.password)).toBe(true);
  });
});

describe("DELETE /api/auth/logout", () => {
  // let token: string; // tidak perlu accessToken
  let refreshCookie: string | undefined; //perlu kirim karena butuh cookies

  beforeAll(async () => {
    await UserTest.create();
    const login = await UserTest.login();
    // token = await UserTest.getToken(login);
    refreshCookie = await UserTest.getRefreshToken(login);
  });

  afterAll(async () => {
    await RefreshTokenTest.deleteAll();
    await UserTest.delete();
  });

  it("should reject logout if refresh token is wrong", async () => {
    const response = await supertest(web)
      .delete("/api/auth/logout")
      .set("Cookie", "refreshToken=salah");

    logger.debug(response.body);

    expect(response.status).toBe(403);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Refresh token is invalid");
    expect(response.body.errors).toBeNull();
  });

  it("should reject logout if refresh token not send", async () => {
    const response = await supertest(web).delete("/api/auth/logout");

    logger.debug(response.body);

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Refresh token not found");
    expect(response.body.errors).toBeNull();
  });

  it("should be able logout success", async () => {
    const response = await supertest(web)
      .delete("/api/auth/logout")
      .set("Cookie", refreshCookie!);

    logger.debug(response.body);

    const user = await UserTest.get();
    expect(user.token).toBeNull();

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeNull();
    expect(
      (response.headers["set-cookie"] as unknown as string[]).some((c) =>
        c.includes("refreshToken=;")
      )
    ).toBe(true);
  });
});
