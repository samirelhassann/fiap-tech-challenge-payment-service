import { FastifyInstance } from "fastify";

import { PaymentController } from "@/adapters/controllers/payment/PaymentController";
import { orderWebHookDocSchema } from "@/adapters/controllers/payment/schema/OrderWebHookSchema";
import { OrderWebHookPresenter } from "@/adapters/presenters/payment/OrderWebHookPresenter";
import { makePaymentRepository } from "@/adapters/repositories/PrismaRepositoryFactory";
import { MercadoPagoService } from "@/adapters/services/mercadoPago/MercadoPagoService";
import { OrderService } from "@/adapters/services/orderService";
import { StatusService } from "@/adapters/services/statusService";
import { PaymentUseCase } from "@/core/useCases/payment/PaymentUseCase";

export async function PaymentRoutes(app: FastifyInstance) {
  const paymentController = new PaymentController(
    new PaymentUseCase(
      makePaymentRepository(),
      new MercadoPagoService(),
      new OrderService(),
      new StatusService()
    ),

    new OrderWebHookPresenter()
  );

  app.post("/mercado-pago/webhook", {
    schema: orderWebHookDocSchema,
    handler: paymentController.webhook.bind(paymentController),
  });
}
