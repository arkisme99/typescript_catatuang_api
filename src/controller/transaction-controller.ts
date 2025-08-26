import { NextFunction, Response } from "express";
import { UserRequest } from "../type/user-request";
import {
  CreateTransactionRequest,
  SearchTransactionRequest,
  UpdateTransactionRequest,
} from "../model/transaction-model";
import { TransactionService } from "../service/transaction-service";
import { successResponse } from "../application/data-state";
import { Decimal } from "@prisma/client/runtime/library";
import { Prisma } from "@prisma/client";

export class TransactionController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateTransactionRequest =
        req.body as CreateTransactionRequest;
      const response = await TransactionService.create(req.user!, request);

      res.status(201).json(successResponse("Create Data Success", response));
    } catch (e) {
      next(e);
    }
  }

  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const transactionId = Number(req.params.transactionId);
      const response = await TransactionService.get(req.user!, transactionId);

      res.status(200).json(successResponse("Get Data Success", response));
    } catch (e) {
      next(e);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: UpdateTransactionRequest =
        req.body as UpdateTransactionRequest;
      request.id = Number(req.params.transactionId);
      const response = await TransactionService.update(req.user!, request);

      res.status(200).json(successResponse("Update Data Success", response));
    } catch (e) {
      next(e);
    }
  }

  static async delete(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const transactionId = Number(req.params.transactionId);
      await TransactionService.delete(req.user!, transactionId);

      res.status(200).json(successResponse("Delete Data Success", null));
    } catch (e) {
      next(e);
    }
  }

  static async search(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: SearchTransactionRequest = {
        transaction_date: req.query.transaction_date as string,
        description: req.query.description as string,
        month: req.query.month ? Number(req.query.month) : undefined,
        year: req.query.year ? Number(req.query.year) : undefined,
        amount: req.query.amount ? Number(req.query.amount) : undefined,
        /* amount: req.query.amount
          ? new Prisma.Decimal(req.query.amount.toString())
          : undefined, */
        page: req.query.page ? Number(req.query.page) : 1,
        size: req.query.page ? Number(req.query.size) : 10,
      };
      const response = await TransactionService.search(req.user!, request);

      res
        .status(200)
        .json(
          successResponse("Get Data Success", response.data, response.paging)
        );
    } catch (e) {
      next(e);
    }
  }
}
