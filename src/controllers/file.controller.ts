import { Request, Response } from "express";
import * as fileService from "../services/file.service";
import { CustomRequest } from "../middlewares/auth.middleware";

export const uploadFile = async (req: any, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const userId = req.user.id;
    const file = await fileService.uploadFile(req.file, userId);
    res.status(201).json(file);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export const getFileById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const file = await fileService.getFileById(id);
    res.status(200).json(file);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export const listFiles = async (req: CustomRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const listSize = parseInt(req.query.listSize as string, 10) || 10;
    const userId = req.user.id;
    const files = await fileService.listFilesByUser(userId, page, listSize);
    res.status(200).json(files);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export const deleteFile = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    await fileService.deleteFile(id);
    res.status(204).send();
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

// Новый контроллер для скачивания файла
export const downloadFile = async (req: CustomRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const file = await fileService.getFileById(id);

    if (!file || !file.filePath) {
      return res.status(404).json({ error: "File not found" });
    }

    // Проверка если файл принадлежит пользователю
    if (file.userId !== req.user.id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    // Получение файла из MinIO
    const { name, mimeType, body } = await fileService.downloadFile(id);

    res.setHeader("Content-Disposition", `attachment; filename="${name}"`);
    res.setHeader("Content-Type", mimeType);

    (body as any).pipe(res);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
