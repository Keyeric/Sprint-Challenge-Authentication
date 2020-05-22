const supertest = require("supertest");
const server = require("./server.js");

describe("server", () => {
  it("can run the tests", () => {
    expect(true).toBeTruthy();
  });

  describe("GET /", () => {
    it("should return http status code 200 OK", () => {
      return supertest(server)
        .get("/")
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
    it("should return { api: 'Server starts here, Navigate to /api'}", () => {
      return supertest(server)
        .get("/")
        .then((response) => {
          expect(response.body).toEqual({
            api: "Server starts here, Navigate to /api",
          });
          expect(response.body.api).toBeDefined();
          expect(response.body.api).toBe(
            "Server starts here, Navigate to /api"
          );
        });
    });
  });
  describe("GET /api", () => {
    it("should return http status code 200 OK", () => {
      return supertest(server)
        .get("/api")
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
    it("should return { message: 'API starts here, Navigate to /auth or /jokes'}", () => {
      return supertest(server)
        .get("/api")
        .then((response) => {
          expect(response.body).toEqual({
            message: "API starts here, Navigate to /auth or /jokes",
          });
          expect(response.body.message).toBeDefined();
          expect(response.body.message).toBe(
            "API starts here, Navigate to /auth or /jokes"
          );
        });
    });
  });
});
