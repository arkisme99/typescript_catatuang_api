import { Transaction } from "@prisma/client";
import { dateToString } from "../helpers/date-helper";
import { Decimal } from "@prisma/client/runtime/library";

export type TransactionResponse = {
  id: number;
  transaction_date: string;
  category_id: number;
  user_id: number;
  description: string;
  month: number;
  year: number;
  amount: Decimal;
  type: string;
  created_at: string | null;
  updated_at: string | null;
};

export type CreateTransactionRequest = {
  transaction_date: string;
  category_id: number;
  description: string;
  month: number;
  year: number;
  amount: Decimal;
};

export function toTransactionResponse(
  transaction: Transaction
): TransactionResponse {
  return {
    id: transaction.id,
    transaction_date: dateToString(transaction.transaction_date),
    category_id: transaction.category_id,
    user_id: transaction.user_id,
    description: transaction.description,
    month: transaction.month,
    year: transaction.year,
    amount: transaction.amount,
    type: transaction.type,
    created_at: transaction.created_at
      ? dateToString(transaction.created_at)
      : null,
    updated_at: transaction.updated_at
      ? dateToString(transaction.updated_at)
      : null,
  };
}
