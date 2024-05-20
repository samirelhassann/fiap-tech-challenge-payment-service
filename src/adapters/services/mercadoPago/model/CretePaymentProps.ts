export interface CreatePaymentProps {
  orderId: string;
  combos: {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
  }[];
}
