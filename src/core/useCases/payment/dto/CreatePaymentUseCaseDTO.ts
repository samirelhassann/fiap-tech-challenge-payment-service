export interface CreatePaymentUseCaseRequestDTO {
  orderId: string;
  combos: {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
  }[];
}

export interface CreatePaymentUseCaseResponseDTO {
  paymentDetails: string | undefined;
}
