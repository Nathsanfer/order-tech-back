import express from "express";
import MenuController from "../controllers/menuController.js";

const menuRouter = express.Router();

// Rotas do Menu
// GET /api/menu - Listar todos os itens do menu
menuRouter.get("/", MenuController.getAll);

// GET /api/menu/:id - Obter um item do menu pelo ID
menuRouter.get("/:id", MenuController.getById);

// POST /api/menu - Criar um novo item do menu
menuRouter.post("/", MenuController.create);

// PUT /api/menu/:id - Atualizar um item do menu
menuRouter.put("/:id", MenuController.update);

// DELETE /api/menu/:id - Remover um item do menu
menuRouter.delete("/:id", MenuController.delete);

export default menuRouter;
