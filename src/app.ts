import express from "express";
import cors from "cors";
import morgan from "morgan";
import { authRouter } from "./routes/auth.routes";
import { customersRouter } from "./routes/customers.routes";
import { salesRouter } from "./routes/sales.routes";
import { statsRouter } from "./routes/stats.routes";

export const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/auth", authRouter);
app.use("/customers", customersRouter);
app.use("/sales", salesRouter);
app.use("/stats", statsRouter);

app.get("/health", (_req, res) => res.json({ ok: true }));
