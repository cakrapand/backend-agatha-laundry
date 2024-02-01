import { IOrder } from "../interfaces/entitiy";
import prisma from "../utils/db.server";

export const findOrders = async () => {
  return await prisma.order.findMany();
};

export const findOrderById = async (userCredentialId: string) => {
  return await prisma.order.findMany({ where: { userCredentialId: userCredentialId } });
};

export const insertOrder = async (newOrder: IOrder) => {
  return await prisma.order.create({ data: newOrder });
};
