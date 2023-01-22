import { Router } from "express";
import { authValidation } from "../middlewares/AuthMiddleware.js";
import { transactionSchema } from "../schemas/TransactionSchema.js";
import validateSchema from "../middlewares/validateSchema.js";
import { listTransactions, makeTransactions } from "../controller/Transactions.js";

const transactionsRouter = Router();

transactionsRouter.use(authValidation);
transactionsRouter.get("/transactions", listTransactions);
transactionsRouter.post("/transactions", validateSchema(transactionSchema), makeTransactions);


export default transactionsRouter;