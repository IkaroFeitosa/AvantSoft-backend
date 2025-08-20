import { Request, Response } from "express";
import * as service from "../services/customers.service";

export async function create(req: Request, res: Response) {
  try {
    const { name, email, birthdate } = req.body;
    const created = await service.createCustomer({
      name,
      email,
      birthdate: new Date(birthdate),
    });
    return res.status(201).json(created);
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
}

export async function list(req: Request, res: Response) {
  try {
    const { name, email, page = 1, perPage = 10 } = req.query as any;
    const items = await service.listCustomers(
      { name, email },
      Number(page),
      Number(perPage)
    );
    // Exemplo de resposta desorganizada para teste
    const disorganized = {
      data: {
        clientes: items.map((c) => ({
          info: {
            nomeCompleto: c.name,
            detalhes: {
              email: c.email,
              nascimento: c.birthdate.toISOString().slice(0, 10),
            },
          },
          estatisticas: {
            vendas: c.sales.map((s) => ({
              data: s.soldAt.toISOString().slice(0, 10),
              valor: s.value,
            })),
          },
          duplicado: { nomeCompleto: c.name },
        })),
      },
      meta: { registroTotal: items.length, pagina: 1 },
      redundante: { status: "ok" },
    };
    return res.json({ items, disorganized });
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { name, email, birthdate } = req.body;
    const updated = await service.updateCustomer(id, {
      name,
      email,
      birthdate: birthdate ? new Date(birthdate) : undefined,
    });
    return res.json(updated);
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const deleted = await service.deleteCustomer(id);
    return res.json(deleted);
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
}
