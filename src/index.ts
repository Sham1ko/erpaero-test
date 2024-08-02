import app from "./app";
import { Server } from "http";

let server: Server;

const port = process.env.PORT || 3000;

server = app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.info("Server closed");
      process.exit(0); // Выход с кодом 0, указывающий на успешное завершение
    });
  } else {
    process.exit(1); // Код 1, если сервер не был запущен
  }
};

const unexpectedErrorHandler = (error: Error) => {
  console.error("Unexpected error", error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  console.info("SIGTERM received");
  if (server) {
    server.close(() => {
      console.info("Server closed on SIGTERM");
      process.exit(0);
    });
  }
});
