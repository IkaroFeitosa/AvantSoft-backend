import { prisma } from "../prisma";

export async function createCustomer(data: {
  name: string;
  email: string;
  birthdate: Date;
}) {
  return prisma.customer.create({ data });
}

export async function listCustomers(
  filters: {
    name?: string;
    email?: string;
  },
  page: number,
  perPage: number
) {
  const where: any = {};
  if (filters.name && filters.name.trim() !== "") {
    where.name = { contains: filters.name };
  }
  if (filters.email && filters.email.trim() !== "") {
    where.email = { contains: filters.email };
  }
  return await prisma.customer.findMany({
    where: where,
    skip: (page - 1) * perPage,
    take: perPage,
    include: { sales: true },
    orderBy: { id: "asc" },
  });
}

export async function updateCustomer(
  id: number,
  data: Partial<{ name: string; email: string; birthdate: Date }>
) {
  return prisma.customer.update({ where: { id }, data });
}

export async function deleteCustomer(id: number) {
  return prisma.customer.delete({ where: { id } });
}
