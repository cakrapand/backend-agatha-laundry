import { TransactionStatus } from "@prisma/client";

export interface IUserCredential {
  email: string;
  password: string;
}

export interface IUserProfile {
  name: string;
  address: string;
  phone: string;
  userCredentialId: string;
}

export interface IService {
  name: string;
  price: number;
}

export interface IOrder {
  id: string;
  userCredentialId: string;
  serviceId: string;
  quantity: number;
  redirectUrl: string;
}

export interface ITransaction {
  orderId: string;
  amount: number;
}
