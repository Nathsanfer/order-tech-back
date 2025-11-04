import express from "express";

// Importe da rota
import recipeRouter from "./recipeRoutes.js";
import menuRouter from "./menuRoutes.js";

const router = express.Router();

// Rota pública

router.use("/recipes", recipeRouter);
router.use("/menu", menuRouter);

export default router;
