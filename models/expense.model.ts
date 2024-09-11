import mongoose, { Types } from "mongoose";

 export  interface ExpenseType {
  user: Types.ObjectId;
  name: string;
  amount: number;
  createdAt: Date;
    updatedAt: Date;
}

const expenseSchema = new mongoose.Schema<ExpenseType>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;

