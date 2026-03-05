import request from "supertest";
import app from "../src/app.js";
import mongoose from "mongoose";   // ← added for cleanup

describe("Auth Routes", () => {

  let token;

  it("should register a user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "freshuser2026@example.com",   // ← fresh email every time you want
        password: "123456"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe("freshuser2026@example.com");
  }, 30000);

  it("should login user and return token", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "freshuser2026@example.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();

    token = res.body.token;
  }, 30000);

});

// Cleanup so next test run doesn't fail
afterAll(async () => {
  await mongoose.disconnect();
});