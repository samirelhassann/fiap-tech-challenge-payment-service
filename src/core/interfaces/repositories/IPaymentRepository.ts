import { OrderPayment } from "@/core/domain/entities/OrderPayment";
import { PrismaClient } from "@prisma/client";

export interface IPaymentRepository {
  findByOrderId(orderId: string): Promise<OrderPayment | null>;

  create(order: OrderPayment, tx?: PrismaClient): Promise<OrderPayment>;

  update(order: OrderPayment, tx?: PrismaClient): Promise<OrderPayment>;
}
