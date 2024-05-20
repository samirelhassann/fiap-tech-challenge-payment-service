import { OrderStatusEnum } from "@/core/domain/enums/OrderStatusEnum";

export interface UpdatePaymentUseCaseRequestDTO {
  orderId: string;
  status: OrderStatusEnum;
}

export interface UpdatePaymentUseCaseResponseDTO {}
