import express, { Request, Response } from "express";
import Expense, { ExpenseType } from "../models/expense.model";
import mongoose from "mongoose";
import User from "../models/user.model";

export const getExpenses = async (req: Request, res: Response) => {
  const { userId } = req.user as any;
  try {
    const expenses = await Expense.find({ user: userId });
    return res.status(200).json({ expenses });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const createExpense = async (req: Request, res: Response) => {
  const { name, amount } = req.body;

  const { userId } = req.user as any;
  if (!name || !amount) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const expense = await Expense.create({ name, amount, user: userId });
    return res
      .status(201)
      .json({ expense, message: "Expense added successfully" });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  const { id: expenseId } = req.params;
  const { userId } = req.user as any;

  try {
    const expenseItem = await Expense.findOne({
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
    await Expense.findByIdAndDelete(expenseId);
    return res.status(200).json({ message: "Expense deleted successfully" });
  } catch (err: any) {
    console.error(err.message);
    return res.status(500).json({ message: err.message });
  }
};


export const setLimit = async (req: Request, res: Response) => {
  const { userId } = req.user as any;
  const { limit } = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, { limit });
    return res.status(200).json({ message: "Limit updated successfully" });
  }
  catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}


export const getExpenseStats = async (req: Request, res: Response) => {
  const { userId } = req.user as any;
  const { month, year } = req.query as any;

  try {
    const userLimit = await User.findById(userId).select('limit');
    const expenseByMonth =  await Expense.find({ user: userId, createdAt: { $gte: new Date(year, month - 1, 1), $lt: new Date(year, month, 0) } })
    const totalExpense = expenseByMonth.reduce((acc, curr) => {
      return acc + curr.amount;
    }, 0);
    res.status(200).json({ totalExpense, limit: userLimit?.limit });

  }
  catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}