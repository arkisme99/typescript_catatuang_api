import { User } from "@prisma/client";
import {
  CreateTransactionRequest,
  SearchTransactionRequest,
  toTransactionResponse,
  TransactionResponse,
  UpdateTransactionRequest,
} from "../model/transaction-model";
import { Validation } from "../validation/validation";
import { TransactionValidation } from "../validation/transaction-validation";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { stringToDate } from "../helpers/date-helper";
import { logger } from "../application/logging";
import { SearchCategoryRequest } from "../model/category-model";
import { Pageable } from "../model/page";

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

  static async update(
    user: User,
    request: UpdateTransactionRequest
  ): Promise<TransactionResponse> {
    const transactionRequest = Validation.validate(
      TransactionValidation.UPDATE,
      request
    );

    await this.mustCheckTransactionFirst(user, transactionRequest.id);
    const category = await this.mustCheckCategoryFirst(
      user,
      transactionRequest.category_id
    );

    const transaction = await prismaClient.transaction.update({
      where: {
        id: transactionRequest.id,
        user_id: user.id,
      },
      data: {
        transaction_date: transactionRequest.transaction_date,
        category_id: transactionRequest.category_id,
        description: transactionRequest.description,
        month: transactionRequest.month,
        year: transactionRequest.year,
        amount: transactionRequest.amount,
        type: category.type,
      },
    });

    return toTransactionResponse(transaction);
  }

  static async delete(user: User, id: number): Promise<TransactionResponse> {
    await this.mustCheckTransactionFirst(user, id);

    const transaction = await prismaClient.transaction.delete({
      where: {
        id: id,
        user_id: user.id,
      },
    });

    return toTransactionResponse(transaction);
  }

  static async search(
    user: User,
    request: SearchTransactionRequest
  ): Promise<Pageable<TransactionResponse>> {
    const transactionRequest = Validation.validate(
      TransactionValidation.SEARCH,
      request
    );
    const skip = (transactionRequest.page - 1) * transactionRequest.size;

    const filters = [];
    //check if transaction_date exist
    if (transactionRequest.transaction_date) {
      filters.push({
        transaction_date: {
          equals: transactionRequest.transaction_date,
        },
      });
    }
    //check if description exist
    if (transactionRequest.description) {
      filters.push({
        description: {
          contains: transactionRequest.description,
        },
      });
    }
    //check if month exist
    if (transactionRequest.month) {
      filters.push({
        month: {
          equals: transactionRequest.month,
        },
      });
    }
    //check if year exist
    if (transactionRequest.year) {
      filters.push({
        year: {
          equals: transactionRequest.year,
        },
      });
    }
    //check if amount exist
    if (transactionRequest.amount) {
      filters.push({
        amount: {
          equals: transactionRequest.amount,
        },
      });
    }

    const transactions = await prismaClient.transaction.findMany({
      where: {
        user_id: user.id,
        AND: filters,
      },
      take: transactionRequest.size,
      skip: skip,
    });

    const total = await prismaClient.transaction.count({
      where: {
        user_id: user.id,
        AND: filters,
      },
    });

    return {
      data: transactions.map((category) => toTransactionResponse(category)),
      paging: {
        current_page: transactionRequest.page,
        total_page: Math.ceil(total / transactionRequest.size),
        size: transactionRequest.size,
      },
    };
  }
}
