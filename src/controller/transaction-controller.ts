import { NextFunction, Response } from "express";
import { UserRequest } from "../type/user-request";
import { CreateTransactionRequest } from "../model/transaction-model";
import { TransactionService } from "../service/transaction-service";
import { successResponse } from "../application/data-state";

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
}
