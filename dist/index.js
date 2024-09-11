"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db_1 = __importDefault(require("./config/db"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const expense_routes_1 = __importDefault(require("./routes/expense.routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "https://expense-log.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "Accept",
        "Origin",
    ],
}));
app.options("*", (0, cors_1.default)({
    origin: true,
    credentials: true,
}));
// app.use(
//   cors({
//     origin: true,
//     credentials: true,
//   })
// );
// routes
app.use("/api/auth", auth_routes_1.default);
app.use("/api/expense", expense_routes_1.default);
app.get("/", (req, res) => {
    res.send("hello rijo");
});
(0, db_1.default)();
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
