import supertest from "supertest";
import { CategoryTest, TransactionTest, UserTest } from "./test-util";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";
import { formatDateString, stringToDate } from "../src/helpers/date-helper";
describe("POST /api/transactions", () => {
  beforeEach(async () => {
    await UserTest.create();
    await CategoryTest.create();
  });

  afterEach(async () => {
    await TransactionTest.deleteAll();
    await CategoryTest.deleteAll();
    await UserTest.delete();
  });
  it("should be able success create transactions", async () => {
    const user = await UserTest.get();
    const category = await CategoryTest.get();

    const response = await supertest(web)
      .post("/api/transactions")
      .set({
        "X-API-TOKEN": "test",
      })
      .send({
        transaction_date: "2025-07-29",
        user_id: user.id,
        category_id: category.id,
        description: "Gaji Bulan Juli 2025",
        month: 7,
        year: 2025,
        amount: 15955650.35,
      });

    logger.debug(response.body);
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBeDefined();
    expect(
      formatDateString(response.body.data.transaction_date, "yyyy-MM-dd")
    ).toBe("2025-07-29");
    expect(response.body.data.user_id).toBe(user.id);
    expect(response.body.data.category_id).toBe(category.id);
    expect(response.body.data.description).toBe("Gaji Bulan Juli 2025");
    expect(response.body.data.month).toBe(7);
    expect(response.body.data.year).toBe(2025);
    expect(response.body.data.amount).toBe("15955650.35");
    expect(response.body.data.type).toBe(category.type);
  });

  it("should reject transaction if data invalid", async () => {
    const user = await UserTest.get();
    const category = await CategoryTest.get();

    const response = await supertest(web)
      .post("/api/transactions")
      .set({
        "X-API-TOKEN": "test",
      })
      .send({
        transaction_date: "",
        user_id: user.id,
        category_id: category.id,
        description: "",
        month: "",
        year: "",
        amount: "",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBeDefined();
    expect(response.body.errors).toBeDefined();
  });

  it("should reject transaction if category is not found", async () => {
    const user = await UserTest.get();
    const category = await CategoryTest.get();

    const response = await supertest(web)
      .post("/api/transactions")
      .set({
        "X-API-TOKEN": "test",
      })
      .send({
        transaction_date: "2025-07-29",
        user_id: user.id,
        category_id: category.id + 1,
        description: "Gaji Bulan Juli 2025",
        month: 7,
        year: 2025,
        amount: 15955650.35,
      });

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBeDefined();
    expect(response.body.errors).toBeNull();
  });

  it("should reject transaction if token is wrong", async () => {
    const user = await UserTest.get();
    const category = await CategoryTest.get();

    const response = await supertest(web)
      .post("/api/transactions")
      .set({
        "X-API-TOKEN": "salah",
      })
      .send({
        transaction_date: "2025-07-29",
        user_id: user.id,
        category_id: category.id,
        description: "Gaji Bulan Juli 2025",
        month: 7,
        year: 2025,
        amount: 15955650.35,
      });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Unauthorized");
    expect(response.body.errors).toBeNull();
  });
});

describe("GET /api/transactions", () => {
  beforeEach(async () => {
    await UserTest.create();
    await CategoryTest.create();
    await TransactionTest.create();
  });

  afterEach(async () => {
    await TransactionTest.deleteAll();
    await CategoryTest.deleteAll();
    await UserTest.delete();
  });

  it("should reject get data if token wrong", async () => {
    const transaction = await TransactionTest.get();
    const response = await supertest(web)
      .get(`/api/transactions/${transaction.id}`)
      .set({
        "X-API-TOKEN": "salah",
      });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Unauthorized");
    expect(response.body.errors).toBeNull();
  });

  it("should reject get data if param transaction not a number", async () => {
    const transaction = await TransactionTest.get();
    const response = await supertest(web)
      .get(`/api/transactions/${transaction.transaction_date}`)
      .set({
        "X-API-TOKEN": "test",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBeDefined();
    expect(response.body.errors).toBeNull();
  });

  it("should reject get data if transaction is not found", async () => {
    const transaction = await TransactionTest.get();
    const response = await supertest(web)
      .get(`/api/transactions/${transaction.id + 1}`)
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
    const transaction = await TransactionTest.get();
    const user = await UserTest.get();
    const category = await CategoryTest.get();

    const response = await supertest(web)
      .get(`/api/transactions/${transaction.id}`)
      .set({
        "X-API-TOKEN": "test",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBeDefined();
    expect(
      formatDateString(response.body.data.transaction_date, "yyyy-MM-dd")
    ).toBe("2025-07-29");
    expect(response.body.data.user_id).toBe(user.id);
    expect(response.body.data.category_id).toBe(category.id);
    expect(response.body.data.description).toBe("Gaji Bulan Juli 2025");
    expect(response.body.data.month).toBe(7);
    expect(response.body.data.year).toBe(2025);
    expect(response.body.data.amount).toBe("15955650.35");
    expect(response.body.data.type).toBe(category.type);
  });
});

describe("PUT /api/transactions", () => {
  beforeEach(async () => {
    await UserTest.create();
    await CategoryTest.create();
    await TransactionTest.create();
  });

  afterEach(async () => {
    await TransactionTest.deleteAll();
    await CategoryTest.deleteAll();
    await UserTest.delete();
  });

  it("should reject update if token is wrong", async () => {
    // const category = await CategoryTest.get();
    const transaction = await TransactionTest.get();
    const response = await supertest(web)
      .put(`/api/transactions/${transaction.id}`)
      .set({
        "X-API-TOKEN": "salah",
      })
      .send({
        description: "Gaji Bulan Juli 2025 edited",
        amount: 17500000,
      });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Unauthorized");
    expect(response.body.errors).toBeNull();
  });

  it("should reject update if request is invalid", async () => {
    const category = await CategoryTest.get();
    const transaction = await TransactionTest.get();
    const response = await supertest(web)
      .put(`/api/transactions/${transaction.id}`)
      .set({
        "X-API-TOKEN": "test",
      })
      .send({
        description: "",
        month: "6",
        amount: 17500000,
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBeDefined();
    expect(response.body.errors).toBeDefined();
  });

  it("should be able update data transactions", async () => {
    const transaction = await TransactionTest.get();
    const user = await UserTest.get();
    const category = await CategoryTest.get();
    const response = await supertest(web)
      .put(`/api/transactions/${transaction.id}`)
      .set({
        "X-API-TOKEN": "test",
      })
      .send({
        transaction_date: "2025-07-29",
        category_id: category.id,
        user_id: user.id,
        description: "Gaji Bulan Juli 2025 edited",
        month: 7,
        year: 2025,
        amount: 17500000,
        type: category.type,
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBeDefined();
    expect(response.body.data.id).toBe(transaction.id);
    expect(response.body.data.description).toBe("Gaji Bulan Juli 2025 edited");
    expect(response.body.data.amount).toBe("17500000");
  });
});
