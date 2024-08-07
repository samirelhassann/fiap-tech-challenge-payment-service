import { CreatePaymentProps } from "@/adapters/services/mercadoPago/model/CretePaymentProps";
import { env } from "@/config/env";
import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { InternalServerError } from "@/core/domain/base/errors/useCases/InternalServerError";
import { OrderPayment } from "@/core/domain/entities/OrderPayment";
import { PendingPaymentOrderMessage } from "@/core/domain/messaging/PendingPaymentOrderMessage";
import { IMessageQueueService } from "@/core/interfaces/messaging/IMessageQueueService";
import { IPaymentRepository } from "@/core/interfaces/repositories/IPaymentRepository";
import { IOrderService } from "@/core/interfaces/services/IOrderService";
import { IPaymentService } from "@/core/interfaces/services/IPaymentService";
import { prisma } from "@/drivers/db/prisma/config/prisma";
import { PrismaClient } from "@prisma/client";

import {
  CreatePaymentUseCaseRequestDTO,
  CreatePaymentUseCaseResponseDTO,
} from "../dto/CreatePaymentUseCaseDTO";

export class CreatePaymentUseCase {
  constructor(
    private paymentRepository: IPaymentRepository,
    private orderService: IOrderService,
    private paymentService: IPaymentService,
    private messageService: IMessageQueueService
  ) {}

  async execute({
    orderId,
  }: CreatePaymentUseCaseRequestDTO): Promise<CreatePaymentUseCaseResponseDTO> {
    return prisma
      .$transaction(async (tx) => {
        const order = await this.orderService.getOrderById(orderId);

        if (!order) {
          throw new Error("Order not found");
        }

        const { combos } = order;
        const orderTotalAmount = combos.reduce(
          (acc, combo) => acc + combo.price * combo.quantity,
          0
        );

        const payment = new OrderPayment({
          orderId: new UniqueEntityId(orderId),
          paymentStatus: "pending",
          totalAmount: orderTotalAmount,
        });

        if (env.MERCADO_PAGO_GENERATE_PAYMENT === "on") {
          const paymentRequest = <CreatePaymentProps>{
            combos,
            orderId,
          };

          const { paymentDetails } =
            await this.paymentService.createPayment(paymentRequest);

          payment.paymentDetails = paymentDetails;
        }

        await this.paymentRepository.create(payment, tx as PrismaClient);

        const pendingPaymentOrderMessage: PendingPaymentOrderMessage = {
          orderId,
        };

        await this.messageService.publish(
          env.RABBITMQ_PENDING_PAYMENT_QUEUE,
          JSON.stringify(pendingPaymentOrderMessage)
        );

        return {
          paymentDetails: payment.paymentDetails,
        };
      })
      .catch((e: Error) => {
        throw new InternalServerError(
          "Payment was not created, an error occurred during the transaction.",
          [e.message]
        );
      });
  }
}
