export interface CreatePaymentUseCaseRequestDTO {
  orderId: string;
}

export interface CreatePaymentUseCaseResponseDTO {
  paymentDetails: string | undefined;
}
