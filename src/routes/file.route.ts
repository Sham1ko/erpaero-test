import { Router } from "express";
import multer from "multer";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  deleteFile,
  getFileById,
  listFiles,
  uploadFile,
  downloadFile, // Добавляем новый импорт
} from "../controllers/file.controller";

const fileRouter = Router();
const upload = multer();

// Загрузка нового файла
fileRouter.post("/upload", authMiddleware, upload.single("file"), uploadFile);

// Список файлов с пагинацией
fileRouter.get("/", authMiddleware, listFiles);

// Получение файла по ID
fileRouter.get("/:id", authMiddleware, getFileById);

// Удаление файла по ID
fileRouter.delete("/:id", authMiddleware, deleteFile);

// Скачивание файла по ID
fileRouter.get("/download/:id", downloadFile); // Новый маршрут для скачивания файла

export default fileRouter;
