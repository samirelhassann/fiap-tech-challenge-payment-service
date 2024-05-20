import { z } from "zod";

import { generateSchemaFromSampleObject } from "@/drivers/webserver/utils/generateSchemaFromSampleObject";

import { CreatePaymentViewModel } from "../viewModel/CreatePaymentViewModel";
import { tag } from "./constants";

export const CreatePaymentPayloadSchema = z.object({
  orderId: z.string(),
  combos: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      price: z.number(),
      quantity: z.number().int(),
    })
  ),
});

const responseExample: CreatePaymentViewModel = {
  paymentDetails: "paymentDetails",
};

export const CreatePaymentDocSchema = {
  tags: [tag],
  description: `Create ${tag}`,
  body: {
    type: "object",
    properties: {
      orderId: {
        type: "string",
      },
      combo: {
        type: "object",
        properties: {
          id: {
            type: "string",
          },
          name: {
            type: "string",
          },
          description: {
            type: "string",
          },
          price: {
            type: "number",
          },
          quantity: {
            type: "integer",
          },
        },
      },
    },
  },
  response: {
    200: generateSchemaFromSampleObject(responseExample),
  },
};
