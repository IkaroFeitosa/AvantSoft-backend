import { Router } from "express";
import * as ctrl from "../controllers/stats.controller";
import { auth } from "../middlewares/auth";

export const statsRouter = Router();

statsRouter.use(auth);
statsRouter.get("/sales-per-day", ctrl.perDay);
statsRouter.get("/top-clients", ctrl.top);
