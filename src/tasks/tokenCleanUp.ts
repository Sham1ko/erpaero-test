import cron from "node-cron";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deactivateExpiredTokens = async () => {
  try {
    const now = new Date();

    await prisma.token.updateMany({
      where: {
        isValid: true,
        expiresAt: { lt: now },
      },
      data: {
        isValid: false,
      },
    });

    console.log("Expired tokens have been deactivated.");
  } catch (error) {
    console.error("Error deactivating expired tokens:", error);
  }
};

cron.schedule("0 * * * *", deactivateExpiredTokens);
