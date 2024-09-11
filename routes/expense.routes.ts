import exp from "constants";
import express, { Router } from "express";
import {
  createExpense,
  deleteExpense,
  getExpenseStats,
  getExpenses,
  setLimit,
} from "../controllers/expense.controller";
import protectRoute from "../middlewares/protectRoute";

const expenseRouter: Router = express.Router();
expenseRouter.get("/", protectRoute, getExpenses);
expenseRouter.post("/create", protectRoute, createExpense);
expenseRouter.delete("/:id", protectRoute, deleteExpense);
expenseRouter.patch("/limit", protectRoute, setLimit);

expenseRouter.get("/stats", protectRoute, getExpenseStats);

export default expenseRouter;
