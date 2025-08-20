import dotenv from "dotenv";
import { app } from "./app";
import { prisma } from "./prisma";
dotenv.config();

const PORT = Number(process.env.PORT || 8000);

async function main() {
  // valida conexão
  await prisma.$connect();
  app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
