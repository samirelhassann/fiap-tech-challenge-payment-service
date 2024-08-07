import { FastifyInstance } from "fastify";

import identifyRequest from "@/adapters/middlewares/identifyRequest";

import { HealthCheckRoutes } from "../routes/HealthCheckRoutes";
import { PaymentRoutes } from "../routes/PaymentRoutes";

const SERVICE_PREFIX = "/payment-service";

export function routes(app: FastifyInstance) {
  app.addHook("preHandler", identifyRequest);

  app.register(HealthCheckRoutes);

  app.register(PaymentRoutes, { prefix: `${SERVICE_PREFIX}` });
}
