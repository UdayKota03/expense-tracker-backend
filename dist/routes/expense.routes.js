"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const expense_controller_1 = require("../controllers/expense.controller");
const protectRoute_1 = __importDefault(require("../middlewares/protectRoute"));
const expenseRouter = express_1.default.Router();
expenseRouter.get("/", protectRoute_1.default, expense_controller_1.getExpenses);
expenseRouter.post("/create", protectRoute_1.default, expense_controller_1.createExpense);
expenseRouter.delete("/:id", protectRoute_1.default, expense_controller_1.deleteExpense);
expenseRouter.patch("/limit", protectRoute_1.default, expense_controller_1.setLimit);
expenseRouter.get("/stats", protectRoute_1.default, expense_controller_1.getExpenseStats);
exports.default = expenseRouter;
