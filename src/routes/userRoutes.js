import express from "express";
import UserController from "../controllers/userController.js";

const userRouter = express.Router();

// Middleware para validação de ID
const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: "ID inválido." });
  }
  next();
};

// Rotas de Usuários

// GET /api/users - Listar todos os usuários
userRouter.get("/", UserController.getAll);

// GET /api/users/:id - Obter um usuário pelo ID
userRouter.get("/:id", validateId, UserController.getById);

// POST /api/users - Criar um novo usuário
userRouter.post("/", UserController.create);

// PUT /api/users/:id - Atualizar um usuário
userRouter.put("/:id", validateId, UserController.update);

// DELETE /api/users/:id - Remover um usuário
userRouter.delete("/:id", validateId, UserController.delete);

export default userRouter;