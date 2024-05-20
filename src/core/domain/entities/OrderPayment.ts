/* eslint-disable import/no-cycle */

import { AggregateRoot } from "../base/entities/AggregateRoot";
import { UniqueEntityId } from "../base/entities/UniqueEntityId";
import { Optional } from "../base/types/Optional";
import { UpdateOrderPaymentEvent } from "../events/UpdateOrderPaymentEvent";

export interface OrderPaymentProps {
  orderId: UniqueEntityId;
  totalAmount: number;
  paymentStatus: string;
  paymentDetails?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class OrderPayment extends AggregateRoot<OrderPaymentProps> {
  constructor(
    props: Optional<OrderPaymentProps, "createdAt">,
    id?: UniqueEntityId
  ) {
    super(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );
  }

  get paymentDetails() {
    return this.props.paymentDetails;
  }

  set paymentDetails(value: string | undefined) {
    this.props.paymentDetails = value;
    this.touch();
  }

  get paymentStatus() {
    return this.props.paymentStatus;
  }

  set paymentStatus(value: string) {
    this.props.paymentStatus = value;
    this.addDomainEvent(new UpdateOrderPaymentEvent(this));

    this.touch();
  }

  get orderId() {
    return this.props.orderId;
  }

  get totalAmount() {
    return this.props.totalAmount;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }
}
