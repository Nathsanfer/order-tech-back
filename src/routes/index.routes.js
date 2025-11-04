import express from "express";

// Importe da rota
import recipeRouter from "./recipeRoutes.js";
import menuRouter from "./menuRoutes.js";
import userRouter from "./userRoutes.js";

const router = express.Router();

// Rota pública

router.use("/recipes", recipeRouter);
router.use("/menu", menuRouter);
router.use("/user", userRouter)

export default router;
