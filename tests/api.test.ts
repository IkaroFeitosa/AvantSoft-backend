import request from "supertest";
import { app } from "../src/app";
import { prisma } from "../src/prisma";

async function authToken() {
  const email = "test@example.com";
  const password = "secret123";
  try {
    await request(app).post("/auth/register").send({ email, password });
  } catch {}
  const login = await request(app)
    .post("/auth/login")
    .send({ email, password });
  return login.body.accessToken as string;
}

beforeEach(async () => {
  await prisma.sale.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.user.deleteMany();
});

describe("Auth", () => {
  it("should register and login", async () => {
    const email = "a@a.com";
    await request(app)
      .post("/auth/register")
      .send({ email, password: "123456" })
      .expect(201);
    const login = await request(app)
      .post("/auth/login")
      .send({ email, password: "123456" })
      .expect(200);
    expect(login.body.accessToken).toBeDefined();
  });
});

describe("Customers CRUD with filters", () => {
  it("should create, list (with filters), update and delete a customer", async () => {
    const token = await authToken();

    // create
    const c = await request(app)
      .post("/customers")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Ana Beatriz",
        email: "ana@example.com",
        birthdate: "1992-05-01",
      })
      .expect(201);

    // list
    const list = await request(app)
      .get("/customers?name=Ana")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    expect(list.body.items.length).toBe(1);

    // update
    const up = await request(app)
      .put(`/customers/${c.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Ana B." })
      .expect(200);
    expect(up.body.name).toBe("Ana B.");

    // delete
    await request(app)
      .delete(`/customers/${c.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});

describe("Sales + Stats", () => {
  it("should compute sales per day and top clients", async () => {
    const token = await authToken();

    const a = await request(app)
      .post("/customers")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Ana", email: "ana@x.com", birthdate: "1990-01-01" });
    const b = await request(app)
      .post("/customers")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Bruno", email: "bruno@x.com", birthdate: "1991-02-02" });

    const sales = [
      { customerId: a.body.id, value: 150, soldAt: "2024-01-01" },
      { customerId: a.body.id, value: 50, soldAt: "2024-01-02" },
      { customerId: b.body.id, value: 200, soldAt: "2024-01-01" },
      { customerId: b.body.id, value: 10, soldAt: "2024-01-03" },
    ];

    for (const s of sales) {
      await request(app)
        .post("/sales")
        .set("Authorization", `Bearer ${token}`)
        .send(s)
        .expect(201);
    }

    const perDay = await request(app)
      .get("/stats/sales-per-day")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    expect(perDay.body).toEqual([
      { date: "2024-01-01", total: 350 },
      { date: "2024-01-02", total: 50 },
      { date: "2024-01-03", total: 10 },
    ]);

    const top = await request(app)
      .get("/stats/top-clients")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    expect(top.body.topVolume.name).toBeDefined();
    expect(top.body.topAverage.name).toBeDefined();
    expect(top.body.topFrequency.name).toBeDefined();
  });
});
