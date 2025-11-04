import express from "express";

// Importe da rota
import menuRouter from "./menuRoutes.js";
import userRouter from "./userRoutes.js";
import orderRouter from "./orderRoutes.js";
import orderMenuRouter from "./orderMenuRoutes.js";

const router = express.Router();

// Rota pública

router.use("/menu", menuRouter);
router.use("/user", userRouter)
router.use("/orders", orderRouter);
router.use("/order_menu", orderMenuRouter);

export default router;
