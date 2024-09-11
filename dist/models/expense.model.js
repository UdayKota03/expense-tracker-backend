"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const expenseSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
}, { timestamps: true });
const Expense = mongoose_1.default.model("Expense", expenseSchema);
exports.default = Expense;
