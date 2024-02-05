import { object, string } from "zod";

export const registerUserSchema = object({
  body: object({
    email: string({ required_error: "Email is required" }).email("Email is invalid"),
    password: string({ required_error: "Password is required" }).min(
      6,
      "Password should be 6 chars minimum"
    ),
    name: string({ required_error: "Name is required" }),
    address: string({ required_error: "Address is required" }),
    phone: string({ required_error: "Phone is required" }),
  }),
});

export const loginUserSchema = object({
  body: object({
    email: string({ required_error: "Email is required" }),
    password: string({ required_error: "Password is required" }),
  }),
});

export const updateProfileSchema = object({
  body: object({
    name: string({ required_error: "Name is required" }),
    address: string({ required_error: "Address is required" }),
    phone: string({ required_error: "Phone is required" }),
  }),
});
