import { Router } from "express";
import * as ctrl from "../controllers/sales.controller";
import { auth } from "../middlewares/auth";

export const salesRouter = Router();

salesRouter.use(auth);
salesRouter.post("/", ctrl.create);
