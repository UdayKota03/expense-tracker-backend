"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserIsAuth = exports.login = exports.signUp = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, confirmPassword } = req.body;
    try {
        if (!name || !email || !password || !confirmPassword)
            return res.status(400).json({ message: "Please fill all the fields" });
        if (password !== confirmPassword)
            return res.status(400).json({ message: "Passwords do not match" });
        const user = yield user_model_1.default.findOne({ email });
        if (user)
            return res.status(400).json({ message: "User already exists" });
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const newUser = new user_model_1.default({
            name,
            email,
            password: hashedPassword,
        });
        const token = (0, generateToken_1.default)(newUser._id);
        yield newUser.save();
        return res.status(200).json({ message: "Signup successful", token });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.signUp = signUp;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }
    try {
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email" });
        }
        const isPasswordCorrect = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect password" });
        }
        const token = (0, generateToken_1.default)(user._id);
        return res.status(200).json({ message: "Login successful", token });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.login = login;
const checkUserIsAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.user;
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            return res
                .status(400)
                .json({ message: "User not found", success: false });
        }
        return res.status(200).json({ message: "User found", success: true });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.checkUserIsAuth = checkUserIsAuth;
