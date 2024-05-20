import { FastifyReply, FastifyRequest } from "fastify";

import { CreatePaymentPayloadSchema } from "@/adapters/controllers/payment/schema/CreatePaymentSchema";
import { CreatePaymentViewModel } from "@/adapters/controllers/payment/viewModel/CreatePaymentViewModel";
import {
  CreatePaymentUseCaseRequestDTO,
  CreatePaymentUseCaseResponseDTO,
} from "@/core/useCases/payment/dto/CreatePaymentUseCaseDTO";

import { ErrorHandlingPresenter } from "../base/ErrorHandlingPresenter";
import { IControllerPresenter } from "../base/IControllerPresenter";

export class CreatePaymentPresenter
  extends ErrorHandlingPresenter
  implements
    IControllerPresenter<
      CreatePaymentUseCaseRequestDTO,
      CreatePaymentUseCaseResponseDTO,
      CreatePaymentViewModel
    >
{
  convertToUseCaseDTO(req: FastifyRequest): CreatePaymentUseCaseRequestDTO {
    const props = CreatePaymentPayloadSchema.parse(req.body);

    return props;
  }

  convertToViewModel(
    model: CreatePaymentUseCaseResponseDTO
  ): CreatePaymentViewModel {
    return {
      paymentDetails: model.paymentDetails,
    };
  }

  async sendResponse(
    res: FastifyReply,
    response: CreatePaymentUseCaseResponseDTO
  ) {
    return res.status(200).send(this.convertToViewModel(response));
  }
}
