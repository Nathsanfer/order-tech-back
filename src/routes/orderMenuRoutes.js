import express from "express";
import OrderMenuController from "../controllers/orderMenuController.js";

const orderMenuRouter = express.Router();

// Rotas para order_menu
orderMenuRouter.get("/", OrderMenuController.getAll);
orderMenuRouter.get("/:orderId/:itemId", OrderMenuController.getById);
orderMenuRouter.post("/", OrderMenuController.create);
orderMenuRouter.put("/:orderId/:itemId", OrderMenuController.update);
orderMenuRouter.delete("/:orderId/:itemId", OrderMenuController.delete);

export default orderMenuRouter;
