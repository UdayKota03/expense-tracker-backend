import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db";
import authRouter from "./routes/auth.routes";
import expenseRouter from "./routes/expense.routes";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cookieParser());

// app.use(
//   cors({
//     origin: "http://localhost:5173/",
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//     credentials: true,
//     allowedHeaders: [
//       "Content-Type",
//       "Authorization",
//       "X-Requested-With",
//       "Accept",
//       "Origin",
//     ],
//   })
// );
app.options("*", cors(
  {
    origin: true,
    credentials: true,
  }
));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// routes
app.use("/api/auth", authRouter);
app.use("/api/expense", expenseRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("hello rijo");
});
connectDB();
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
