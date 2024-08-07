import { env } from "@/config/env";
import { InternalServerError } from "@/core/domain/base/errors/useCases/InternalServerError";
import { PaidPaymentOrderMessage } from "@/core/domain/messaging/PaidPaymentOrderMessage";
import { IMessageQueueService } from "@/core/interfaces/messaging/IMessageQueueService";
import { IPaymentRepository } from "@/core/interfaces/repositories/IPaymentRepository";
import { IOrderService } from "@/core/interfaces/services/IOrderService";
import { prisma } from "@/drivers/db/prisma/config/prisma";
import { PrismaClient } from "@prisma/client";

import {
  UpdatePaymentUseCaseRequestDTO,
  UpdatePaymentUseCaseResponseDTO,
} from "../dto/UpdatePaymentUseCaseDTO";

export class UpdatePaymentUseCase {
  constructor(
    private paymentRepository: IPaymentRepository,
    private orderService: IOrderService,
    private messageService: IMessageQueueService
  ) {}

  async execute({
    status,
    orderId,
  }: UpdatePaymentUseCaseRequestDTO): Promise<UpdatePaymentUseCaseResponseDTO> {
    return prisma
      .$transaction(async (tx) => {
        const order = await this.orderService.getOrderById(orderId);

        if (!order) {
          throw new Error("Order not found");
        }

        const payment = await this.paymentRepository.findByOrderId(orderId);

        if (!payment) {
          throw new Error("Payment not found");
        }

        payment.paymentStatus = status;
        await this.paymentRepository.update(payment, tx as PrismaClient);

        const paidPaymentOrderMessage: PaidPaymentOrderMessage = {
          orderId,
        };

        await this.messageService.publish(
          env.RABBITMQ_PAID_PAYMENT_QUEUE,
          JSON.stringify(paidPaymentOrderMessage)
        );

        return {};
      })
      .catch((e: Error) => {
        throw new InternalServerError(
          "Payment status was not updated, an error occurred during the transaction.",
          [e.message]
        );
      });
  }
}
