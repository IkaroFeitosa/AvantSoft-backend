import { Request, Response } from "express";
import * as service from "../services/auth.service";

export async function register(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await service.register(email, password);
    return res.status(201).json(user);
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const token = await service.login(email, password);
    return res.json(token);
  } catch (e: any) {
    return res.status(401).json({ message: e.message });
  }
}
