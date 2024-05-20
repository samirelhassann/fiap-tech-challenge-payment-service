import { IPaymentRepository } from "@/core/interfaces/repositories/IPaymentRepository";
import { IOrderService } from "@/core/interfaces/services/IOrderService";
import { IStatusService } from "@/core/interfaces/services/IStatusService";

import {
  UpdatePaymentUseCaseRequestDTO,
  UpdatePaymentUseCaseResponseDTO,
} from "../dto/UpdatePaymentUseCaseDTO";

export class UpdatePaymentUseCase {
  constructor(
    private paymentRepository: IPaymentRepository,
    private orderService: IOrderService,
    private statusService: IStatusService
  ) {}

  async execute({
    status,
    orderId,
  }: UpdatePaymentUseCaseRequestDTO): Promise<UpdatePaymentUseCaseResponseDTO> {
    const order = await this.orderService.getOrderById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    const payment = await this.paymentRepository.findByOrderId(orderId);

    if (!payment) {
      throw new Error("Payment not found");
    }

    payment.paymentStatus = status;
    await this.paymentRepository.update(payment);

    await this.statusService.updateOrderStatus({
      orderId,
      status,
    });

    return {};
  }
}
