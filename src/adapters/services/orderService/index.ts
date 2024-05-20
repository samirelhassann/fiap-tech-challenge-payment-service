import { IOrderService } from "@/core/interfaces/services/IOrderService";

import api from "./api";
import { GetOrderByIdResponse } from "./model/GetOrderByIdResponse";

export class OrderService implements IOrderService {
  async getOrderById(id: string): Promise<GetOrderByIdResponse> {
    const endpoint = `/orders/${id}`;

    return api
      .get<GetOrderByIdResponse>(endpoint)
      .then((res) => res.data)
      .catch((error) => {
        console.error(
          `Error calling URL: ${error.config?.url} with parameters: ${id}`,
          error
        );
        throw new Error(error.response.data.message);
      });
  }
}
