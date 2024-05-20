/* eslint-disable no-new */

import { UpdatedOrderStatusSubscriber } from "@/core/subscribers/UpdatedOrderStatusSubscriber";
import { PaymentUseCase } from "@/core/useCases/payment/PaymentUseCase";

import { PrismaPaymentRepository } from "../repositories/PrismaPaymentRepository";
import { MercadoPagoService } from "../services/mercadoPago/MercadoPagoService";
import { OrderService } from "../services/orderService";
import { StatusService } from "../services/statusService";

export function orderSubscribers() {
  const paymentRepository = new PrismaPaymentRepository();

  const paymentUseCase = new PaymentUseCase(
    paymentRepository,
    new MercadoPagoService(),
    new OrderService(),
    new StatusService()
  );

  new UpdatedOrderStatusSubscriber(paymentUseCase);
}
