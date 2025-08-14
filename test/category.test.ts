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
