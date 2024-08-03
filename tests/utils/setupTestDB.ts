import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";

const prisma = new PrismaClient();

const runMigrations = () => {
  try {
    execSync("npx prisma migrate deploy", { stdio: "inherit" });
  } catch (error: any) {
    console.error("Error running migrations:", error.message);
  }
};

const setupTestDB = async () => {
  runMigrations();

  beforeEach(async () => {
    // Очищаем данные из таблиц, учитывая зависимости
    await prisma.token.deleteMany();
    await prisma.file.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
};

export default setupTestDB;
