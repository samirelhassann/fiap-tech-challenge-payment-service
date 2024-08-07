import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "@/drivers/webserver/utils/convertZodSchemaToDocsTemplate";

import { tag } from "./constants";

export const updatePaymentPathParams = z.object({
  id: z.string(),
});

export const updatePaymentDocSchema = {
  tags: [tag],
  description: `Update ${tag}`,
  params: convertZodSchemaToDocsTemplate({
    schema: updatePaymentPathParams,
  }),
};
