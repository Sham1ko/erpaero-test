import express from "express";
import authRouter from "./auth.route";
import userRouter from "./user.route";
import fileRouter from "./file.route";

const router = express.Router();

router.use("/api/auth", authRouter);
router.use("/api/user", userRouter);
router.use("/api/file", fileRouter);

export default router;
