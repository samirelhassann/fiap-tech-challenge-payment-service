import { UpdateOrderStatusRequest } from "@/adapters/services/statusService/model/UpdateOrderStatusRequest";

export interface IStatusService {
  updateOrderStatus(paymentInfo: UpdateOrderStatusRequest): Promise<void>;
}
