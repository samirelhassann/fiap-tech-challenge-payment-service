import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { OrderPayment } from "@/core/domain/entities/OrderPayment";
import { OrderPayment as PrismaOrderPayment } from "@prisma/client";

export class PrismaOrderPaymentToDomainConverter {
  static convert(prismaOrderPayment: PrismaOrderPayment): OrderPayment {
    return new OrderPayment(
      {
        orderId: new UniqueEntityId(prismaOrderPayment.order_id),
        paymentDetails: prismaOrderPayment.payment_details ?? undefined,
        paymentStatus: prismaOrderPayment.payment_status,
        totalAmount: prismaOrderPayment.total_amount.toNumber(),
        createdAt: prismaOrderPayment.created_at,
        updatedAt: prismaOrderPayment.updated_at ?? undefined,
      },
      new UniqueEntityId(prismaOrderPayment.id)
    );
  }
}
