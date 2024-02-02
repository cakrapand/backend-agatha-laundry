import { OrderStatus } from "@prisma/client";
import { IOrder } from "../interfaces/entitiy";
import {
  findOrdersById,
  findOrders,
  insertOrder,
  updateOrderStatusById,
} from "../repositories/order.repository";

export const getOrders = async () => {
  return await findOrders();
};

export const getOrdersById = async (userCredentialId: string) => {
  return await findOrdersById(userCredentialId);
};

export const createOrder = async (newOrder: IOrder) => {
  return await insertOrder(newOrder);
};

export const editOrderStatusById = async (id: string, orderStatus: OrderStatus) => {
  return await updateOrderStatusById(id, orderStatus);
};
