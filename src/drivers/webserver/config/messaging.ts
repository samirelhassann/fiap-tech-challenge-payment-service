import { FastifyInstance } from "fastify";

import { PaymentMessaging } from "../messaging/PaymentMessaging";

export function messaging(app: FastifyInstance) {
  app.register(PaymentMessaging);
}
