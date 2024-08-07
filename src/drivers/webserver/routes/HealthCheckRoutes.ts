import { FastifyInstance } from "fastify";

export async function HealthCheckRoutes(app: FastifyInstance) {
  app.get("/health-start", async () => ({ status: "ok" }));
  app.get("/health-read", async () => ({ status: "ok" }));
  app.get("/health-live", async () => ({ status: "ok" }));
}
