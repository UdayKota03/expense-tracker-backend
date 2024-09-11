"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpenseStats =
  exports.setLimit =
  exports.deleteExpense =
  exports.createExpense =
  exports.getExpenses =
    void 0;
const expense_model_1 = __importDefault(require("../models/expense.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const getExpenses = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    try {
      const expenses = yield expense_model_1.default.find({ user: userId });
      return res.status(200).json({ expenses });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });
exports.getExpenses = getExpenses;
const createExpense = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { name, amount } = req.body;
    const { userId } = req.user;
    if (!name || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }
    try {
      const expense = yield expense_model_1.default.create({
        name,
        amount,
        user: userId,
      });
      return res
        .status(201)
        .json({ expense, message: "Expense added successfully" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });
exports.createExpense = createExpense;
const deleteExpense = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id: expenseId } = req.params;
    const { userId } = req.user;
    try {
      const expenseItem = yield expense_model_1.default.findOne({
        _id: expenseId,
      });
      if (!expenseItem) {
        return res.status(404).json({ message: "Item not found" });
      }
      if (expenseItem.user.toString() !== userId.toString()) {
        return res
          .status(403)
          .json({ message: "You are not authorized to delete this expense" });
      }
      // Delete the expense
      yield expense_model_1.default.findByIdAndDelete(expenseId);
      return res.status(200).json({ message: "Expense deleted successfully" });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ message: err.message });
    }
  });
exports.deleteExpense = deleteExpense;
const setLimit = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const { limit } = req.body;
    try {
      const user = yield user_model_1.default.findByIdAndUpdate(userId, {
        limit,
      });
      return res.status(200).json({ message: "Limit updated successfully" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });
exports.setLimit = setLimit;
const getExpenseStats = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const { month, year } = req.query;
    try {
      const userLimit = yield user_model_1.default
        .findById(userId)
        .select("limit");
      const expenseByMonth = yield expense_model_1.default.find({
        user: userId,
        createdAt: {
          $gte: new Date(year, month - 1, 1),
          $lt: new Date(year, month, 0),
        },
      });
      const totalExpense = expenseByMonth.reduce((acc, curr) => {
        return acc + curr.amount;
      }, 0);
      res
        .status(200)
        .json({
          totalExpense,
          limit:
            userLimit === null || userLimit === void 0
              ? void 0
              : userLimit.limit,
        });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });
exports.getExpenseStats = getExpenseStats;
