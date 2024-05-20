import { DomainEvents } from "@/core/domain/base/events/DomainEvents";
import { OrderPayment } from "@/core/domain/entities/OrderPayment";
import { IPaymentRepository } from "@/core/interfaces/repositories/IPaymentRepository";
import { prisma } from "@/drivers/db/prisma/config/prisma";

import { PrismaOrderPaymentToDomainConverter } from "./converters/PrismaOrderPaymentToDomainConverter";

export class PrismaPaymentRepository implements IPaymentRepository {
  async findByOrderId(orderId: string): Promise<OrderPayment | null> {
    const data = await prisma.orderPayment.findFirst({
      where: {
        order_id: orderId,
      },
    });

    if (!data) {
      return null;
    }

    return PrismaOrderPaymentToDomainConverter.convert(data);
  }

  async create(order: OrderPayment): Promise<OrderPayment> {
    const data = await prisma.orderPayment.create({
      data: {
        order_id: order.orderId.toString(),
        total_amount: order.totalAmount,
        payment_status: order.paymentStatus,
        payment_details: order.paymentDetails,
        created_at: order.createdAt,
        updated_at: order.updatedAt,
      },
    });

    return PrismaOrderPaymentToDomainConverter.convert(data);
  }

  async update(order: OrderPayment): Promise<OrderPayment> {
    const data = await prisma.orderPayment.update({
      where: {
        id: order.id.toString(),
      },
      data: {
        total_amount: order.totalAmount,
        payment_status: order.paymentStatus,
        payment_details: order.paymentDetails,
        updated_at: order.updatedAt,
      },
    });

    DomainEvents.dispatchEventsForAggregate(order.id);

    return PrismaOrderPaymentToDomainConverter.convert(data);
  }
}
