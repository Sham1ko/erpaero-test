import { Router } from "express";
import {
  signup,
  signin,
  refreshToken,
  getUserInfo,
  logout,
} from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const authRouter = Router();

// Регистрация нового пользователя
authRouter.post("/signup", signup);

// Аутентификация пользователя (получение JWT токена)
authRouter.post("/signin", signin);

// Обновление JWT токена по refresh токену
authRouter.post("/signin/new_token", refreshToken);

// Получение информации о пользователе
authRouter.get("/info", authMiddleware, getUserInfo);

// Выход пользователя (инвалидирование токена)
authRouter.get("/logout", authMiddleware, logout);

export default authRouter;
