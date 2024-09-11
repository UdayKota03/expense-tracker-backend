"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const protectRoute_1 = __importDefault(require("../middlewares/protectRoute"));
const authRouter = express_1.default.Router();
authRouter.post('/signup', auth_controller_1.signUp);
authRouter.post('/login', auth_controller_1.login);
authRouter.get("/check-user", protectRoute_1.default, auth_controller_1.checkUserIsAuth);
exports.default = authRouter;
