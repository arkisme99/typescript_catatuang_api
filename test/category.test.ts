import supertest from "supertest";
import { CategoryTest, UserTest } from "./test-util";
import { response } from "express";
import { logger } from "../src/application/logging";
import { web } from "../src/application/web";

describe("POST /api/categories", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await CategoryTest.deleteAll();
    await UserTest.delete();
  });

  it("should reject create categories if invalid request", async () => {
    const response = await supertest(web)
      .post("/api/categories")
      .set({
        "X-API-TOKEN": "test",
      })
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
      .set({
        "X-API-TOKEN": "salah",
      })
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
      .set({
        "X-API-TOKEN": "test",
      })
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
  beforeEach(async () => {
    await UserTest.create();
    await CategoryTest.create();
  });

  afterEach(async () => {
    await CategoryTest.deleteAll();
    await UserTest.delete();
  });

  it("should reject get data if token wrong", async () => {
    const category = await CategoryTest.get();
    const response = await supertest(web)
      .get(`/api/categories/${category.id}`)
      .set({
        "X-API-TOKEN": "salah",
      });

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
      .set({
        "X-API-TOKEN": "test",
      });

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
      .set({
        "X-API-TOKEN": "test",
      });

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
      .set({
        "X-API-TOKEN": "test",
      });

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
  beforeEach(async () => {
    await UserTest.create();
    await CategoryTest.create();
  });

  afterEach(async () => {
    await CategoryTest.deleteAll();
    await UserTest.delete();
  });

  it("should reject update if token is wrong", async () => {
    const contact = await CategoryTest.get();
    const response = await supertest(web)
      .put(`/api/categories/${contact.id}`)
      .set({
        "X-API-TOKEN": "salah",
      })
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
      .set({
        "X-API-TOKEN": "test",
      })
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
      .set({
        "X-API-TOKEN": "test",
      })
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
