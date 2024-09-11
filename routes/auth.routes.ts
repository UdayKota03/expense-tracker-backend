import express, { Router } from 'express';
import { signUp, login, checkUserIsAuth } from "../controllers/auth.controller";
import protectRoute from '../middlewares/protectRoute';


const authRouter : Router = express.Router();

authRouter.post('/signup',signUp)
authRouter.post('/login',login)
authRouter.get("/check-user", protectRoute, checkUserIsAuth)
 


export default authRouter ; 
