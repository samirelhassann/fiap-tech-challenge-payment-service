import { FastifyReply, FastifyRequest } from "fastify";

import { OrderWebHookPresenter } from "@/adapters/presenters/payment/OrderWebHookPresenter";
import { UpdatePaymentPresenter } from "@/adapters/presenters/payment/UpdatePaymentPresenter";
import { IPaymentUseCase } from "@/core/useCases/payment/IPaymentUseCase";

export class PaymentController {
  constructor(
    private paymentUseCase: IPaymentUseCase,
    private orderWebHookPresenter: OrderWebHookPresenter,
    private updatePaymentPresenter: UpdatePaymentPresenter
  ) {}

  async webhook(req: FastifyRequest, res: FastifyReply): Promise<void> {
    return this.paymentUseCase
      .orderWebhook(this.orderWebHookPresenter.convertToUseCaseDTO(req))
      .then(() => this.orderWebHookPresenter.sendResponse(res))
      .catch((error) =>
        this.orderWebHookPresenter.convertErrorResponse(error, res)
      );
  }

  async update(req: FastifyRequest, res: FastifyReply): Promise<void> {
    return this.paymentUseCase
      .updatePayment(this.updatePaymentPresenter.convertToUseCaseDTO(req))
      .then(() => this.updatePaymentPresenter.sendResponse(res))
      .catch((error) =>
        this.updatePaymentPresenter.convertErrorResponse(error, res)
      );
  }
}
