import { DomainEvents } from "@/core/domain/base/events/DomainEvents";
import { EventHandler } from "@/core/domain/base/events/EventHandler";

import { OrderStatusEnum } from "../domain/enums/OrderStatusEnum";
import { UpdateOrderPaymentEvent } from "../domain/events/UpdateOrderPaymentEvent";
import { IPaymentUseCase } from "../useCases/payment/IPaymentUseCase";

export class UpdatedOrderStatusSubscriber implements EventHandler {
  constructor(private paymentUseCase: IPaymentUseCase) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.updatePaymentInfos.bind(this),
      UpdateOrderPaymentEvent.name
    );
  }

  private async updatePaymentInfos({
    orderPayment: order,
  }: UpdateOrderPaymentEvent) {
    if (order.paymentStatus === "paid") {
      await this.paymentUseCase.updatePayment({
        orderId: order.orderId.toString(),
        status: OrderStatusEnum.IN_PREPARATION,
      });
    }
  }
}
