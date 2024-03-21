import { array, number, object, string } from "zod";

export const createOrderSchema = object({
  body: object({
    orderDetails: array(
      object({
        packageOnServiceId: string({ required_error: "packageOnServiceId is required" }),
        // quantity: number({ required_error: "Quantity is required" }),
      })
    ).nonempty("Order Detail is Required"),
  }),
});
