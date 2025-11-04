import express from "express";
import RecipeController from "../controllers/recipeController.js";

const recipeRouter = express.Router();

// Rotas de Receitas
// GET /api/recipes - Listar todas as receitas
recipeRouter.get("/", RecipeController.getAll);

// GET /api/recipes/:id - Obter uma receita pelo ID
recipeRouter.get("/:id", RecipeController   .getById);

// POST /api/recipes - Criar uma nova receita
recipeRouter.post("/", RecipeController.create);

// PUT /api/recipes/:id - Atualizar uma receita
recipeRouter.put("/:id", RecipeController.update);

// DELETE /api/recipes/:id - Remover uma receita
recipeRouter.delete("/:id", RecipeController.delete);

export default recipeRouter;
