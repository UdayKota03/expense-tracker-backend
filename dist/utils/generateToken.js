"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (userId) => {
    const token = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET);
    // res.cookie("token", token, {
    //     maxAge: 15 * 24 * 60 * 60 * 1000, // MS
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: "strict",
    //     domain : ".vercel.app",
    // })
    return token;
};
exports.default = generateToken;
