import express from "express";

// Importe da rota
import menuRouter from "./menuRoutes.js";
import userRouter from "./userRoutes.js";
import orderRouter from "./orderRoutes.js";
import orderMenuRouter from "./orderMenuRoutes.js";
import authRouter from "./authRoutes.js";

const router = express.Router();

// Rota pública

router.use("/menu", menuRouter);
// Expor também em /api/menu para compatibilidade com front (Next.js e proxies)
router.use("/api/menu", menuRouter);
router.use("/user", userRouter)
router.use("/orders", orderRouter);
router.use("/order_menu", orderMenuRouter);
router.use("/auth", authRouter);

export default router;
