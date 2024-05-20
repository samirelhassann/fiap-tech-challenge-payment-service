import { OrderPayment } from "@/core/domain/entities/OrderPayment";

export interface IPaymentRepository {
  findByOrderId(orderId: string): Promise<OrderPayment | null>;

  create(order: OrderPayment): Promise<OrderPayment>;

  update(order: OrderPayment): Promise<OrderPayment>;
}
