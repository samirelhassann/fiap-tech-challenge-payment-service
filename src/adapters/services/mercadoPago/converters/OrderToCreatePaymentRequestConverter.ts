import { env } from "@/config/env";

import { CreatePaymentRequest, Item } from "../model/CreatePaymentRequest";
import { CreatePaymentProps } from "../model/CretePaymentProps";

export class OrderToCreatePaymentRequestConverter {
  static convert(paymentInfos: CreatePaymentProps): CreatePaymentRequest {
    const items: Item[] = paymentInfos.combos.map((combo) => ({
      sku_number: combo.id.toString(),
      category: "combo",
      title: combo.id.toString(),
      description: combo.id.toString(),
      unit_price: combo.price,
      quantity: combo.quantity,
      unit_measure: "unit",
      total_amount: combo.price * combo.quantity,
    }));

    const paymentRequest: CreatePaymentRequest = {
      description: paymentInfos.orderId.toString(),
      external_reference: paymentInfos.orderId.toString(),
      items,
      notification_url: env.MERCADO_PAGO_WEBHOOK_URL,
      title: paymentInfos.orderId.toString(),
      total_amount: items.reduce((acc, item) => acc + item.total_amount, 0),
    };

    return paymentRequest;
  }
}
