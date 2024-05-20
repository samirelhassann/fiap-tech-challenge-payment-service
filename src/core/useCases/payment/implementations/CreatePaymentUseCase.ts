import { CreatePaymentProps } from "@/adapters/services/mercadoPago/model/CretePaymentProps";
import { env } from "@/config/env";
import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { OrderPayment } from "@/core/domain/entities/OrderPayment";
import { IPaymentRepository } from "@/core/interfaces/repositories/IPaymentRepository";
import { IOrderService } from "@/core/interfaces/services/IOrderService";
import { IPaymentService } from "@/core/interfaces/services/IPaymentService";

import {
  CreatePaymentUseCaseRequestDTO,
  CreatePaymentUseCaseResponseDTO,
} from "../dto/CreatePaymentUseCaseDTO";

export class CreatePaymentUseCase {
  constructor(
    private paymentRepository: IPaymentRepository,
    private orderService: IOrderService,
    private paymentService: IPaymentService
  ) {}

  async execute({
    combos,
    orderId,
  }: CreatePaymentUseCaseRequestDTO): Promise<CreatePaymentUseCaseResponseDTO> {
    const order = await this.orderService.getOrderById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    const payment = new OrderPayment({
      orderId: new UniqueEntityId(orderId),
      paymentStatus: "pending",
      totalAmount: combos.reduce(
        (acc, combo) => acc + combo.price * combo.quantity,
        0
      ),
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

    await this.paymentRepository.create(payment);

    return {
      paymentDetails: payment.paymentDetails,
    };
  }
}
