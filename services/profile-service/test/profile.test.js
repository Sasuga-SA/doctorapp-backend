import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import app from "../src/app.js";
import { sequelize } from "../src/models/index.js";

describe("Profile Service", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe("GET /api/v1/health", () => {
    it("should return service health status", async () => {
      const response = await request(app).get("/api/v1/health");
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Profile Service is running");
      expect(response.body.timestamp).toBeDefined();
    });
  });

  describe("POST /api/v1/profiles", () => {
    it("should create a new profile", async () => {
      const profileData = {
        firstName: "Juan",
        lastName: "Pérez",
        dateOfBirth: "1990-01-01",
        gender: "male",
        phone: "+1234567890",
        address: "Calle Principal 123",
        city: "Ciudad",
        state: "Estado",
        country: "País",
        postalCode: "12345",
        bio: "Médico especialista"
      };

      // Mock JWT token
      const mockToken = "mock.jwt.token";
      
      const response = await request(app)
        .post("/api/v1/profiles")
        .set("Authorization", `Bearer ${mockToken}`)
        .send(profileData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.firstName).toBe(profileData.firstName);
      expect(response.body.data.lastName).toBe(profileData.lastName);
    });

    it("should return 401 without token", async () => {
      const profileData = {
        firstName: "Juan",
        lastName: "Pérez"
      };

      const response = await request(app)
        .post("/api/v1/profiles")
        .send(profileData);

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });
  });

  describe("GET /api/v1/profiles", () => {
    it("should return paginated profiles", async () => {
      const response = await request(app)
        .get("/api/v1/profiles")
        .query({ page: 1, limit: 10 });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.profiles).toBeDefined();
      expect(response.body.data.pagination).toBeDefined();
    });
  });

  describe("GET /api/v1/profiles/search", () => {
    it("should return 400 without search term", async () => {
      const response = await request(app)
        .get("/api/v1/profiles/search");

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Search term required");
    });

    it("should search profiles by name", async () => {
      const response = await request(app)
        .get("/api/v1/profiles/search")
        .query({ q: "Juan" });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.profiles).toBeDefined();
    });
  });
}); 