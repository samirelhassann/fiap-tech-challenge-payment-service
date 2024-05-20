/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */

import { IPaymentRepository } from "@/core/interfaces/repositories/IPaymentRepository";
import { IOrderService } from "@/core/interfaces/services/IOrderService";
import { IPaymentService } from "@/core/interfaces/services/IPaymentService";
import { IStatusService } from "@/core/interfaces/services/IStatusService";

import {
  CreatePaymentUseCaseRequestDTO,
  CreatePaymentUseCaseResponseDTO,
} from "./dto/CreatePaymentUseCaseDTO";
import { OrderWebHookUseCaseRequestDTO } from "./dto/OrderWebHookUseCaseDTO";
import {
  UpdatePaymentUseCaseRequestDTO,
  UpdatePaymentUseCaseResponseDTO,
} from "./dto/UpdatePaymentUseCaseDTO";
import { CreatePaymentUseCase } from "./implementations/CreatePaymentUseCase";
import { OrderWebHookUseCase } from "./implementations/OrderWebHookUseCase";
import { UpdatePaymentUseCase } from "./implementations/UpdatePaymentUseCase";
import { IPaymentUseCase } from "./IPaymentUseCase";

export class PaymentUseCase implements IPaymentUseCase {
  private createPaymentUseCase: CreatePaymentUseCase;

  private updatePaymentUseCase: UpdatePaymentUseCase;

  private orderWebHookUseCase: OrderWebHookUseCase;

  constructor(
    private paymentRepository: IPaymentRepository,
    private paymentService: IPaymentService,
    private orderSevice: IOrderService,
    private statusService: IStatusService
  ) {
    this.createPaymentUseCase = new CreatePaymentUseCase(
      this.paymentRepository,
      this.orderSevice,
      this.paymentService
    );

    this.updatePaymentUseCase = new UpdatePaymentUseCase(
      this.paymentRepository,
      this.orderSevice,
      this.statusService
    );

    this.orderWebHookUseCase = new OrderWebHookUseCase(
      this.paymentRepository,
      this.orderSevice,
      this.paymentService
    );
  }

  async createPayment(
    props: CreatePaymentUseCaseRequestDTO
  ): Promise<CreatePaymentUseCaseResponseDTO> {
    return this.createPaymentUseCase.execute(props);
  }

  async updatePayment(
    props: UpdatePaymentUseCaseRequestDTO
  ): Promise<UpdatePaymentUseCaseResponseDTO> {
    return this.updatePaymentUseCase.execute(props);
  }

  async orderWebhook(props: OrderWebHookUseCaseRequestDTO): Promise<void> {
    return this.orderWebHookUseCase.execute(props);
  }
}
