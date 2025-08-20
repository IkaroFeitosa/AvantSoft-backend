import { execSync } from "node:child_process";

process.env.JWT_SECRET = "test-secret";
process.env.PORT = "0";
process.env.DATABASE_URL = "file:./test.db";
process.env.PRISMA_PROVIDER = "sqlite";

// sincroniza schema
beforeAll(() => {
  execSync("npx prisma generate", { stdio: "inherit" });
  execSync("npx prisma db push", { stdio: "inherit" });
});
