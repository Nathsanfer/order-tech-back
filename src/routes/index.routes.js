import express from "express";

// Importe da rota
import menuRouter from "./menuRoutes.js";
import userRouter from "./userRoutes.js";

const router = express.Router();

// Rota pública

router.use("/menu", menuRouter);
router.use("/user", userRouter)

export default router;
