import { Request, Response } from "express";
import * as service from "../services/sales.service";

export async function create(req: Request, res: Response) {
  try {
    const { customerId, value, soldAt } = req.body;
    const created = await service.createSale({
      customerId: Number(customerId),
      value: Number(value),
      soldAt: new Date(soldAt),
    });
    return res.status(201).json(created);
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
}
