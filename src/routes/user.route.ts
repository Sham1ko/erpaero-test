import { Router } from "express";
import {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const userRouter = Router();

// Создание нового пользователя
userRouter.post("/", createUser);

// Получение пользователя по ID
userRouter.get("/:id", authMiddleware, getUserById);

// Обновление пользователя по ID
userRouter.put("/:id", authMiddleware, updateUser);

// Удаление пользователя по ID
userRouter.delete("/:id", authMiddleware, deleteUser);

export default userRouter;
