import { FastifyReply, FastifyRequest } from "fastify";

import { updatePaymentPathParams } from "@/adapters/controllers/payment/schema/UpdatePaymentSchema";
import { OrderStatusEnum } from "@/core/domain/enums/OrderStatusEnum";
import {
  UpdatePaymentUseCaseRequestDTO,
  UpdatePaymentUseCaseResponseDTO,
} from "@/core/useCases/payment/dto/UpdatePaymentUseCaseDTO";

import { ErrorHandlingPresenter } from "../base/ErrorHandlingPresenter";
import { IControllerPresenter } from "../base/IControllerPresenter";

export class UpdatePaymentPresenter
  extends ErrorHandlingPresenter
  implements
    IControllerPresenter<
      UpdatePaymentUseCaseRequestDTO,
      UpdatePaymentUseCaseResponseDTO,
      void
    >
{
  convertToUseCaseDTO(req: FastifyRequest): UpdatePaymentUseCaseRequestDTO {
    const { id } = updatePaymentPathParams.parse(req.params);

    return {
      orderId: id,
      status: OrderStatusEnum.PAID,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
  async sendResponse(res: FastifyReply) {
    return res.status(200).send();
  }
}
