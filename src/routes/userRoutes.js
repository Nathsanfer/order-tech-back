import express from "express";
import UserController from "../controllers/userController.js";

const userRouter = express.Router();

// Rotas de Usuários

// GET /api/users - Listar todas os ususários
userRouter.get("/", UserController.getAll);

// GET /api/users/:id - Obter um usuário pelo ID
userRouter.get("/:id", UserController.getById);

// POST /api/users - Criar um novo usuário
userRouter.post("/", UserController.create);

// PUT /api/users/:id - Atualizar um usuário
userRouter.put("/:id", UserController.update);

// DELETE /api/users/:id - Remover um usuário
userRouter.delete("/:id", UserController.delete);

export default userRouter;
