import { OrderStatus } from "@prisma/client";
import { IOrder } from "../interfaces/entitiy";
import prisma from "../utils/db.server";

export const findOrders = async () => {
  return await prisma.order.findMany();
};

export const findOrdersById = async (userCredentialId: string) => {
  return await prisma.order.findMany({
    orderBy: [{ createdAt: "desc" }],
    where: { userCredentialId: userCredentialId },
    include: { service: true },
  });
};

export const insertOrder = async (newOrder: IOrder) => {
  return await prisma.order.create({ data: newOrder });
};

export const updateOrderStatusById = async (id: string, orderStatus: OrderStatus) => {
  return await prisma.order.update({
    where: { id },
    data: { orderStatus },
  });
};
