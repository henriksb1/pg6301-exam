const request = require("supertest");

const express = require("express");

const app = express();
app.use(require("body-parser").json());
app.use(require("../src/server/messageApi"));

describe("message API", () => {
  it("should return predefined message", async () => {
    await request(app)
      .get("")
      .then((response) => {
        expect(response.body.find(({ id }) => id === 1)).toMatchObject({
          message: "Hello from the other side",
        });
      });
  });

  it("should create a new message", async () => {
    await request(app)
      .post("")
      .send({
        username: "per@borgli",
        receiver: "sander@nilsen",
        message: "Just for test purposes",
      })
      .expect(201);
    await request(app)
      .get("")
      .then((response) => {
        expect(response.body.map(({ message }) => message)).toContain(
          "Just for test purposes"
        );
      });
  });
});
