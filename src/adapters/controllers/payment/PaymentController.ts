import { FastifyReply, FastifyRequest } from "fastify";

import { CreatePaymentPresenter } from "@/adapters/presenters/payment/CreatePaymentPresenter";
import { OrderWebHookPresenter } from "@/adapters/presenters/payment/OrderWebHookPresenter";
import { IPaymentUseCase } from "@/core/useCases/payment/IPaymentUseCase";

import { CreatePaymentViewModel } from "./viewModel/CreatePaymentViewModel";

export class PaymentController {
  constructor(
    private paymentUseCase: IPaymentUseCase,
    private createPaymentPresenter: CreatePaymentPresenter,
    private orderWebHookPresenter: OrderWebHookPresenter
  ) {}

  async createPayment(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<CreatePaymentViewModel> {
    return this.paymentUseCase
      .createPayment(this.createPaymentPresenter.convertToUseCaseDTO(req))
      .then((response) =>
        this.createPaymentPresenter.sendResponse(res, response)
      )
      .catch((error) =>
        this.createPaymentPresenter.convertErrorResponse(error, res)
      );
  }

  async webhook(req: FastifyRequest, res: FastifyReply): Promise<void> {
    return this.paymentUseCase
      .orderWebhook(this.orderWebHookPresenter.convertToUseCaseDTO(req))
      .then(() => this.orderWebHookPresenter.sendResponse(res))
      .catch((error) =>
        this.orderWebHookPresenter.convertErrorResponse(error, res)
      );
  }
}
