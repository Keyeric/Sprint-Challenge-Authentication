const supertest = require("supertest");
const router = require("../api/server");
const db = require("../database/dbConfig");

beforeEach(() => {
  return db.migrate
    .rollback()
    .then(() => db.migrate.latest())
    .then(() => db.seed.run());
});

describe("auth-router", () => {
  it("can run the tests", () => {
    expect(true).toBeTruthy();
  });

  describe("POST /api/auth/register", () => {
    it("should return http status code 200 OK", async () => {
      const res = await supertest(router).post("/api/auth/register").send({
        username: "Kyle",
        password: "code",
      });
      expect(res.status).toBe(201);
      expect(res.type).toBe("application/json");
    });
  });

  describe("POST /api/auth/login", () => {
    it("should return http status code 200 OK", async () => {
      const login = await supertest(router).post("/api/auth/login").send({
        username: "Todd",
        password: "code",
      });
      expect(login.status).toBe(200);
      expect(login.type).toBe("application/json");
    });
  });
});
