import express from "express";

// Importe da rota
import recipeRouter from "./recipeRoutes.js";

const router = express.Router();

// Rota pública
router.use("/recipes", recipeRouter);

export default router;
