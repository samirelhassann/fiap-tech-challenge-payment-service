import { FastifyReply, FastifyRequest } from "fastify";

import { OrderWebHookPresenter } from "@/adapters/presenters/payment/OrderWebHookPresenter";
import { IPaymentUseCase } from "@/core/useCases/payment/IPaymentUseCase";

export class PaymentController {
  constructor(
    private paymentUseCase: IPaymentUseCase,
    private orderWebHookPresenter: OrderWebHookPresenter
  ) {}

  async webhook(req: FastifyRequest, res: FastifyReply): Promise<void> {
    return this.paymentUseCase
      .orderWebhook(this.orderWebHookPresenter.convertToUseCaseDTO(req))
      .then(() => this.orderWebHookPresenter.sendResponse(res))
      .catch((error) =>
        this.orderWebHookPresenter.convertErrorResponse(error, res)
      );
  }
}
