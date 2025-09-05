import supertest from "supertest";
import { CategoryTest, RefreshTokenTest, UserTest } from "./test-util";
import { logger } from "../src/application/logging";
import { web } from "../src/application/web";

describe("POST /api/categories", () => {
  let token: string;
  beforeAll(async () => {
    await UserTest.create();
    const login = await UserTest.login();
    token = await UserTest.getToken(login);
  });

  afterAll(async () => {
    await RefreshTokenTest.deleteAll();
    await CategoryTest.deleteAll();
    await UserTest.delete();
  });

  it("should reject create categories if invalid request", async () => {
    const response = await supertest(web)
      .post("/api/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "",
        type: "asdasfvagfa agvsgfabgabg gbagbabtgatgbaga a gagae ga gagzadfg afeg aefg afgaga fga dg a",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBeDefined();
    expect(response.body.errors).toBeDefined();
  });

  it("should reject create categories if token wrong", async () => {
    const response = await supertest(web)
      .post("/api/categories")
      .set("Authorization", `Bearer token-salah`)
      .send({
        name: "Gaji Kantor",
        type: "income",
      });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Unauthorized");
    expect(response.body.errors).toBeNull();
  });

  it("should be able create categories", async () => {
    const response = await supertest(web)
      .post("/api/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Gaji Kantor",
        type: "income",
      });

    logger.debug(response.body);
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBeDefined();
    expect(response.body.data.name).toBe("Gaji Kantor");
    expect(response.body.data.type).toBe("income");
  });
});

describe("GET /api/categories", () => {
  let token: string;
  beforeAll(async () => {
    await UserTest.create();
    const login = await UserTest.login();
    token = await UserTest.getToken(login);
    await CategoryTest.create();
  });

  afterAll(async () => {
    await RefreshTokenTest.deleteAll();
    await CategoryTest.deleteAll();
    await UserTest.delete();
  });

  it("should reject get data if token wrong", async () => {
    const category = await CategoryTest.get();
    const response = await supertest(web)
      .get(`/api/categories/${category.id}`)
      .set("Authorization", `Bearer token-salah`);

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Unauthorized");
    expect(response.body.errors).toBeNull();
  });

  it("should reject get data if param category not a number", async () => {
    const contact = await CategoryTest.get();
    const response = await supertest(web)
      .get(`/api/categories/${contact.name}`)
      .set("Authorization", `Bearer ${token}`);

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBeDefined();
    expect(response.body.errors).toBeNull();
  });

  it("should reject get data if category is not found", async () => {
    const contact = await CategoryTest.get();
    const response = await supertest(web)
      .get(`/api/categories/${contact.id + 1}`)
      .set("Authorization", `Bearer ${token}`);

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBeDefined();
    expect(response.body.errors).toBeNull();
  });

  it("should be able get data", async () => {
    const contact = await CategoryTest.get();
    const response = await supertest(web)
      .get(`/api/categories/${contact.id}`)
      .set("Authorization", `Bearer ${token}`);

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBeDefined();
    expect(response.body.data.id).toBe(contact.id);
    expect(response.body.data.name).toBe(contact.name);
    expect(response.body.data.type).toBe(contact.type);
  });
});

describe("PUT /api/categories", () => {
  let token: string;
  beforeAll(async () => {
    await UserTest.create();
    const login = await UserTest.login();
    token = await UserTest.getToken(login);
    await CategoryTest.create();
  });

  afterAll(async () => {
    await RefreshTokenTest.deleteAll();
    await CategoryTest.deleteAll();
    await UserTest.delete();
  });

  it("should reject update if token is wrong", async () => {
    const contact = await CategoryTest.get();
    const response = await supertest(web)
      .put(`/api/categories/${contact.id}`)
      .set("Authorization", `Bearer token-salah`)
      .send({
        name: "Gaji Kantor Edited",
        type: "income",
      });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Unauthorized");
    expect(response.body.errors).toBeNull();
  });

  it("should reject update if request is invalid", async () => {
    const contact = await CategoryTest.get();
    const response = await supertest(web)
      .put(`/api/categories/${contact.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "",
        type: "asdasfvagfa agvsgfabgabg gbagbabtgatgbaga a gagae ga gagzadfg afeg aefg afgaga fga dg a",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBeDefined();
    expect(response.body.errors).toBeDefined();
  });

  it("should be able update data category", async () => {
    const contact = await CategoryTest.get();
    const response = await supertest(web)
      .put(`/api/categories/${contact.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Gaji Kantor Edited",
        type: "income edited",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBeDefined();
    expect(response.body.data.id).toBe(contact.id);
    expect(response.body.data.name).toBe("Gaji Kantor Edited");
    expect(response.body.data.type).toBe("income edited");
  });
});

describe("DELETE /api/categories", () => {
  let token: string;
  beforeAll(async () => {
    await UserTest.create();
    const login = await UserTest.login();
    token = await UserTest.getToken(login);
    await CategoryTest.create();
  });

  afterAll(async () => {
    await RefreshTokenTest.deleteAll();
    await CategoryTest.deleteAll();
    await UserTest.delete();
  });

  it("should reject delete if token is wrong", async () => {
    const contact = await CategoryTest.get();
    const response = await supertest(web)
      .delete(`/api/categories/${contact.id}`)
      .set("Authorization", `Bearer token-salah`);

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Unauthorized");
    expect(response.body.errors).toBeNull();
  });

  it("should be able delete data category", async () => {
    const contact = await CategoryTest.get();
    const response = await supertest(web)
      .delete(`/api/categories/${contact.id}`)
      .set("Authorization", `Bearer ${token}`);

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeNull();
  });
});

describe("Get /api/categories", () => {
  let token: string;
  beforeAll(async () => {
    await UserTest.create();
    const login = await UserTest.login();
    token = await UserTest.getToken(login);
    await CategoryTest.create();
  });
  afterAll(async () => {
    await RefreshTokenTest.deleteAll();
    await CategoryTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able search data", async () => {
    const response = await supertest(web)
      .get(`/api/categories`)
      .set("Authorization", `Bearer ${token}`);

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBeDefined();
    expect(response.body.data.length).toBe(1);
    expect(response.body.paging.current_page).toBe(1);
    expect(response.body.paging.total_page).toBe(1);
    expect(response.body.paging.size).toBe(10);
  });

  it("should be able search data if name exist", async () => {
    const response = await supertest(web)
      .get(`/api/categories`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        name: "Kantor",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBeDefined();
    expect(response.body.data.length).toBe(1);
    expect(response.body.paging.current_page).toBe(1);
    expect(response.body.paging.total_page).toBe(1);
    expect(response.body.paging.size).toBe(10);
  });

  it("should be able search data if type exist", async () => {
    const response = await supertest(web)
      .get(`/api/categories`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        type: "income",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBeDefined();
    expect(response.body.data.length).toBe(1);
    expect(response.body.paging.current_page).toBe(1);
    expect(response.body.paging.total_page).toBe(1);
    expect(response.body.paging.size).toBe(10);
  });

  it("should be able search data if name and type exist", async () => {
    const response = await supertest(web)
      .get(`/api/categories`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        name: "Kantor",
        type: "income",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBeDefined();
    expect(response.body.data.length).toBe(1);
    expect(response.body.paging.current_page).toBe(1);
    expect(response.body.paging.total_page).toBe(1);
    expect(response.body.paging.size).toBe(10);
  });

  it("should be able to search category no result", async () => {
    const response = await supertest(web)
      .get(`/api/categories`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        name: "salah",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBeDefined();
    expect(response.body.data.length).toBe(0);
    expect(response.body.paging.current_page).toBe(1);
    expect(response.body.paging.total_page).toBe(0);
    expect(response.body.paging.size).toBe(10);
  });

  it("should be able to search category with paging", async () => {
    const response = await supertest(web)
      .get(`/api/categories`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        page: 2,
        size: 1,
      });

    logger.debug("di sini");
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBeDefined();
    expect(response.body.data.length).toBe(0);
    expect(response.body.paging.current_page).toBe(2);
    expect(response.body.paging.total_page).toBe(1);
    expect(response.body.paging.size).toBe(1);
  });

  it("should reject if token is wrong", async () => {
    const response = await supertest(web)
      .get(`/api/categories`)
      .set("Authorization", `Bearer token-salah`);

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Unauthorized");
    expect(response.body.errors).toBeNull();
  });
});
