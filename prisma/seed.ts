import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Dados do JSON fornecido
  const clientes = [
    {
      nome: "Ana Beatriz",
      email: "ana.b@example.com",
      nascimento: new Date("1992-05-01"),
      vendas: [
        { data: new Date("2024-01-01"), valor: 150 },
        { data: new Date("2024-01-02"), valor: 50 },
      ],
    },
    {
      nome: "Carlos Eduardo",
      email: "cadu@example.com",
      nascimento: new Date("1987-08-15"),
      vendas: [],
    },
  ];

  for (const c of clientes) {
    const created = await prisma.customer.create({
      data: {
        name: c.nome,
        email: c.email,
        birthdate: c.nascimento,
        sales: {
          create: c.vendas.map((v) => ({
            value: v.valor,
            soldAt: v.data,
          })),
        },
      },
    });
    console.log("Cliente inserido:", created.name);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
