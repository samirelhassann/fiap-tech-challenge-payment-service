import { OrderStatusEnum } from "@/core/domain/enums/OrderStatusEnum";

export interface UpdateOrderStatusRequest {
  orderId: string;
  status: OrderStatusEnum;
}
