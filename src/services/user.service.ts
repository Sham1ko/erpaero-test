import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const createUser = async (id: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      id,
      password: hashedPassword,
    },
  });
  return user;
};

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

export const updateUser = async (id: string, updateData: any) => {
  const user = await prisma.user.update({
    where: { id },
    data: updateData,
  });
  return user;
};

export const deleteUser = async (id: string) => {
  await prisma.user.delete({
    where: { id },
  });
};
