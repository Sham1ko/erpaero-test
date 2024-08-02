// src/app.ts

import express from "express";
import dotenv from "dotenv";
import router from "./routes";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import swaggerDocs from "./config/swaggerConfig";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(router);

export default app;
