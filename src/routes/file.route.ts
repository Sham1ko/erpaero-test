import { Router } from "express";
import multer from "multer";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  deleteFile,
  getFileById,
  listFiles,
  uploadFile,
  downloadFile,
} from "../controllers/file.controller";

const fileRouter = Router();
const upload = multer();

/**
 * @swagger
 * components:
 *   schemas:
 *     File:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         mimeType:
 *           type: string
 *         filePath:
 *           type: string
 *       required:
 *         - id
 *         - name
 *         - mimeType
 *         - filePath
 */

/**
 * @swagger
 * tags:
 *   name: Files
 *   description: API for managing files
 */

/**
 * @swagger
 * /file/upload:
 *   post:
 *     summary: Upload a new file
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: File uploaded successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */
fileRouter.post("/upload", authMiddleware, upload.single("file"), uploadFile);

/**
 * @swagger
 * /file:
 *   get:
 *     summary: List files with pagination
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: List of files retrieved successfully
 *       401:
 *         description: Unauthorized
 */
fileRouter.get("/", authMiddleware, listFiles);

/**
 * @swagger
 * /file/{id}:
 *   get:
 *     summary: Get file by ID
 *     tags: [Files]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: File retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: File not found
 */
fileRouter.get("/:id", authMiddleware, getFileById);

/**
 * @swagger
 * /file/{id}:
 *   delete:
 *     summary: Delete file by ID
 *     tags: [Files]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: File deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: File not found
 */
fileRouter.delete("/:id", authMiddleware, deleteFile);

/**
 * @swagger
 * /file/download/{id}:
 *   get:
 *     summary: Download file by ID
 *     tags: [Files]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: File downloaded successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: File not found
 */
fileRouter.get("/download/:id", authMiddleware, downloadFile);

export default fileRouter;
