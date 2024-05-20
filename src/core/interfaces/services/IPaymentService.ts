import { CreatePaymentProps } from "@/adapters/services/mercadoPago/model/CretePaymentProps";

export interface IPaymentService {
  createPayment(paymentInfo: CreatePaymentProps): Promise<{
    paymentDetails: string;
  }>;

  getOrderStatus(platformOrderId: string): Promise<{
    status: string;
    orderId: string;
  }>;
}
