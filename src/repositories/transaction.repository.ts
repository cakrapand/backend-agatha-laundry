import { TransactionStatus } from "@prisma/client";
import { ITransaction } from "../interfaces/entitiy";
import prisma from "../utils/db.server";

export const insertTransaction = async (newTransaction: ITransaction) => {
  return await prisma.transaction.create({ data: newTransaction });
};

export const updateTransactionStatusById = async (
  orderId: string,
  transactionStatus: TransactionStatus
) => {
  return await prisma.transaction.update({
    where: {
      orderId: orderId,
    },
    data: {
      transactionStatus: transactionStatus,
    },
  });
};
