/* eslint-disable import/no-cycle */
import { UniqueEntityId } from "../base/entities/UniqueEntityId";
import { DomainEvent } from "../base/events/DomainEvent";
import { OrderPayment } from "../entities/OrderPayment";

export class UpdateOrderPaymentEvent implements DomainEvent {
  public ocurredAt: Date;

  public orderPayment: OrderPayment;

  constructor(orderStatus: OrderPayment) {
    this.orderPayment = orderStatus;
    this.ocurredAt = new Date();
  }

  getAggregateId(): UniqueEntityId {
    return this.orderPayment.id;
  }
}
