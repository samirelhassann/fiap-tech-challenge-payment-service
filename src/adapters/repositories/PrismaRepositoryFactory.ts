import { PrismaPaymentRepository } from "./PrismaPaymentRepository";

let paymentRepository: PrismaPaymentRepository;

export function makePaymentRepository() {
  if (!paymentRepository) {
    paymentRepository = new PrismaPaymentRepository();
  }
  return paymentRepository;
}
