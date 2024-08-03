// import supertest from "supertest";
// import app from "../../src/app"; // Предположим, что у вас есть файл app.ts с инициализацией вашего приложения
// import setupTestDB from "../utils/setupTestDB";

// setupTestDB();

// describe("User Signup", () => {
//   it("should register a new user", async () => {
//     const request = supertest(app); // Создаем объект supertest для тестирования приложения
//     const response = await request
//       .post("/auth/signup") // Отправляем POST-запрос на /auth/signup
//       .send({
//         id: "testuser",
//         password: "password123",
//         device: "test-device",
//       })
//       .expect(201); // Ожидаем, что статус ответа будет 201

//     // Проверяем, что в ответе есть ожидаемые данные
//     expect(response.body.user).toHaveProperty("id", "testuser");
//     expect(response.body).toHaveProperty("accessToken");
//     expect(response.body).toHaveProperty("refreshToken");
//   });
// });
