import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = "your_jwt_secret";
const JWT_EXPIRATION = "10m";
const REFRESH_TOKEN_EXPIRATION = "7d";

export const signup = async (data: any) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const newUser = await prisma.user.create({
    data: {
      id: data.id,
      password: hashedPassword,
    },
  });
  const tokens = generateTokens(newUser.id);
  return { ...tokens, user: newUser };
};

export const signin = async (id: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }
  return generateTokens(user.id);
};

export const refreshToken = async (refreshToken: string) => {
  try {
    const decoded = jwt.verify(refreshToken, JWT_SECRET) as jwt.JwtPayload;
    return generateTokens(decoded.id);
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};

export const getUserInfo = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

export const logout = async (id: string) => {
  // try {
  //   await prisma.user.update({
  //     where: { id },
  //     data: { refreshToken: null },
  //   });
  // } catch (error) {
  //   throw new Error("Failed to logout");
  // }
  return;
};

const generateTokens = (userId: string) => {
  const accessToken = jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });
  const refreshToken = jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRATION,
  });
  return { accessToken, refreshToken };
};
