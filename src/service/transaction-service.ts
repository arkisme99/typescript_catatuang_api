import { User } from "@prisma/client";
import {
  CreateTransactionRequest,
  toTransactionResponse,
  TransactionResponse,
} from "../model/transaction-model";
import { Validation } from "../validation/validation";
import { TransactionValidation } from "../validation/transaction-validation";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { stringToDate } from "../helpers/date-helper";
import { logger } from "../application/logging";

export class TransactionService {
  static async mustCheckCategoryFirst(user: User, id: number) {
    const category = await prismaClient.category.findFirst({
      where: {
        id: id,
        user_id: user.id,
      },
    });

    if (!category) throw new ResponseError(404, "Category not found");

    return category;
  }

  static async mustCheckTransactionFirst(user: User, id: number) {
    const transaction = await prismaClient.transaction.findFirst({
      where: {
        id: id,
        user_id: user.id,
      },
    });

    if (!transaction) throw new ResponseError(404, "Transaction not found");

    return transaction;
  }

  static async create(
    user: User,
    request: CreateTransactionRequest
  ): Promise<TransactionResponse> {
    const category = await this.mustCheckCategoryFirst(
      user,
      request.category_id
    );

    const transactionRequest = Validation.validate(
      TransactionValidation.CREATE,
      request
    );

    logger.debug(
      `check request validated : ${JSON.stringify(transactionRequest)}`
    );

    const newData = {
      ...transactionRequest,
      user_id: user.id,
      type: category.type,
    };

    const transaction = await prismaClient.transaction.create({
      data: newData,
    });

    return toTransactionResponse(transaction);
  }

  static async get(user: User, id: number): Promise<TransactionResponse> {
    const transaction = await this.mustCheckTransactionFirst(user, id);
    return toTransactionResponse(transaction);
  }
}
