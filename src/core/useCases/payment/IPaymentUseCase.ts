import {
  CreatePaymentUseCaseRequestDTO,
  CreatePaymentUseCaseResponseDTO,
} from "./dto/CreatePaymentUseCaseDTO";
import { OrderWebHookUseCaseRequestDTO } from "./dto/OrderWebHookUseCaseDTO";
import {
  UpdatePaymentUseCaseRequestDTO,
  UpdatePaymentUseCaseResponseDTO,
} from "./dto/UpdatePaymentUseCaseDTO";

export interface IPaymentUseCase {
  createPayment(
    props: CreatePaymentUseCaseRequestDTO
  ): Promise<CreatePaymentUseCaseResponseDTO>;

  updatePayment(
    props: UpdatePaymentUseCaseRequestDTO
  ): Promise<UpdatePaymentUseCaseResponseDTO>;

  orderWebhook(props: OrderWebHookUseCaseRequestDTO): Promise<void>;
}
