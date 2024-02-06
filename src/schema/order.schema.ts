import { number, object, string } from "zod";

export const createOrderSchema = object({
  body: object({
    serviceId: string({ required_error: "Service Id is required" }),
    quantity: number({ required_error: "Quantity is required" }),
  }),
});
