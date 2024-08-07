// src/adapters/consumers/OrderConsumer.ts

import { PaymentConsumerHandler } from "@/adapters/messaging/PaymentConsumerHandler";
import { RabbitMQService } from "@/adapters/messaging/rabbitmq/RabbitMQService";
import { makePaymentRepository } from "@/adapters/repositories/PrismaRepositoryFactory";
import { MercadoPagoService } from "@/adapters/services/mercadoPago/MercadoPagoService";
import { OrderService } from "@/adapters/services/orderService";
import { StatusService } from "@/adapters/services/statusService";
import { env } from "@/config/env";
import { PaymentUseCase } from "@/core/useCases/payment/PaymentUseCase";

export async function PaymentMessaging() {
  const rabbitMQService = RabbitMQService.getInstance();
  const paymentUseCase = new PaymentUseCase(
    makePaymentRepository(),
    new MercadoPagoService(),
    new OrderService(),
    new StatusService(),

    RabbitMQService.getInstance()
  );

  const paymentConsumerHandler = new PaymentConsumerHandler(
    rabbitMQService,
    paymentUseCase
  );

  await rabbitMQService.connect();

  rabbitMQService.consume(
    env.RABBITMQ_NEW_ORDER_QUEUE,
    paymentConsumerHandler.handleNewOrderMessage.bind(paymentConsumerHandler)
  );
}
