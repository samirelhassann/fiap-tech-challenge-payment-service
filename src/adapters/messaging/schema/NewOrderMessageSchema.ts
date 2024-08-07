import { z } from "zod";

export const NewOrderMessageSchema = z.object({
  orderId: z.string(),
});
