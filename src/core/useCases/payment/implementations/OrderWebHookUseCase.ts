import { IPaymentRepository } from "@/core/interfaces/repositories/IPaymentRepository";
import { IOrderService } from "@/core/interfaces/services/IOrderService";
import { IPaymentService } from "@/core/interfaces/services/IPaymentService";

import { OrderWebHookUseCaseRequestDTO } from "../dto/OrderWebHookUseCaseDTO";

export class OrderWebHookUseCase {
  constructor(
    private paymentRepository: IPaymentRepository,
    private orderService: IOrderService,
    private paymentService: IPaymentService
  ) {}

  async execute({
    platformOrderId,
  }: OrderWebHookUseCaseRequestDTO): Promise<void> {
    const { orderId, status } =
      await this.paymentService.getOrderStatus(platformOrderId);

    const order = await this.orderService.getOrderById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    const payment = await this.paymentRepository.findByOrderId(orderId);

    if (!payment) {
      throw new Error("Payment not found");
    }

    if (status === "paid" && payment.paymentStatus === "pending") {
      payment.paymentStatus = "paid";
      await this.paymentRepository.update(payment);
    }
  }
}
