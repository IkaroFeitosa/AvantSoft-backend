import { prisma } from "../prisma";

export async function createSale(data: {
  customerId: number;
  value: number;
  soldAt: Date;
}) {
  // garante cliente existente
  await prisma.customer.findUniqueOrThrow({ where: { id: data.customerId } });
  return prisma.sale.create({ data });
}
