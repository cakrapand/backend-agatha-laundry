import { TransactionStatus } from "@prisma/client";
import { ITransaction } from "../interfaces/entitiy";
import {
  insertTransaction,
  updateTransactionStatusById,
} from "../repositories/transaction.repository";

export const createTransaction = async (newTransaction: ITransaction) => {
  return await insertTransaction(newTransaction);
};

export const editTransactionStatusById = async (
  orderId: string,
  transactionStatus: TransactionStatus
) => {
  return await updateTransactionStatusById(orderId, transactionStatus);
};
