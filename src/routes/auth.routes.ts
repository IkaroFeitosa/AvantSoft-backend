import { Router } from "express";
import * as ctrl from "../controllers/auth.controller";

export const authRouter = Router();

authRouter.post("/register", ctrl.register);
authRouter.post("/login", ctrl.login);
