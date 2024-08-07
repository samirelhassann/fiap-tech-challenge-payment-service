/* eslint-disable no-console */
import { ConsumeMessage } from "amqplib";

import { IMessageQueueService } from "@/core/interfaces/messaging/IMessageQueueService";
import { PaymentUseCase } from "@/core/useCases/payment/PaymentUseCase";

import { NewOrderMessageSchema } from "./schema/NewOrderMessageSchema";

export class PaymentConsumerHandler {
  constructor(
    private messageQueueService: IMessageQueueService,
    private paymentUseCase: PaymentUseCase
  ) {}

  async handleNewOrderMessage(message: ConsumeMessage | null) {
    if (!message) {
      return;
    }

    try {
      const newOrder = NewOrderMessageSchema.parse(
        JSON.parse(message.content.toString())
      );

      await this.paymentUseCase.createPayment(newOrder);
    } finally {
      this.messageQueueService.acknowledgeMessage(message);
    }
  }
}
