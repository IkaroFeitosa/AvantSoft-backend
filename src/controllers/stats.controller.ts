import { Request, Response } from "express";
import * as service from "../services/stats.service";

export async function perDay(_req: Request, res: Response) {
  const data = await service.salesPerDay();
  return res.json(data);
}

export async function top(_req: Request, res: Response) {
  const data = await service.topClients();
  return res.json(data);
}
