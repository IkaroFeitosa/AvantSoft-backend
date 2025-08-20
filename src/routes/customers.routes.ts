import { Router } from "express";
import * as ctrl from "../controllers/customers.controller";
import { auth } from "../middlewares/auth";

export const customersRouter = Router();

customersRouter.use(auth);
customersRouter.post("/", ctrl.create);
customersRouter.get("/", ctrl.list);
customersRouter.put("/:id", ctrl.update);
customersRouter.delete("/:id", ctrl.remove);
