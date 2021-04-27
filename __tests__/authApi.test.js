const request = require("supertest");

const express = require("express");

const app = express();
app.use(require("body-parser").json());
app.use(require("../src/server/authApi"));

describe("auth API", () => {
  it("should return predefined user", async () => {
    await request(app)
      .get("/api/user")
      .then((response) => {
        expect(response.body.find(({ id }) => id === 1)).toMatchObject({
          email: "per@mail.com",
        });
      });
  });

  it("should create a new user", async () => {
    await request(app)
      .post("/api/user")
      .send({
        firstName: "Oskar",
        lastName: "Alme",
        email: "oskar@alme",
        password: "123",
      })
      .expect(201);
    await request(app)
      .get("/api/user")
      .then((response) => {
        expect(response.body.map(({ email }) => email)).toContain("oskar@alme");
      });
  });
});
