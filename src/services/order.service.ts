import { IOrder } from "../interfaces/entitiy";
import { findOrderById, findOrders, insertOrder } from "../repositories/order.repository";

export const getOrders = async () => {
  return await findOrders();
};

export const getOrderById = async (userCredentialId: string) => {
  return await findOrderById(userCredentialId);
};

export const createOrder = async (newOrder: IOrder) => {
  return await insertOrder(newOrder);
};
