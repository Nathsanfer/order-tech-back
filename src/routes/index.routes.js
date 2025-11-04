import express from "express";

// Importe da rota
import menuRouter from "./menuRoutes.js";
import orderRouter from "./orderRoutes.js";

const router = express.Router();

// Rota pública

router.use("/menu", menuRouter);
router.use("/orders", orderRouter);

export default router;
