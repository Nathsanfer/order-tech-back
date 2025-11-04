import express from "express";
import OrderController from "../controllers/orderController.js";

const orderRouter = express.Router();

// Rotas de Pedidos

// GET /api/orders - Listar todas os pedidos
orderRouter.get("/", OrderController.getAll);

// GET /api/orders/:id - Obter um pedido pelo ID
orderRouter.get("/:id", OrderController.getById);

// POST /api/orders - Criar um novo pedido
orderRouter.post("/", OrderController.create);

// PUT /api/orders/:id - Atualizar um pedido
orderRouter.put("/:id", OrderController.update);

// DELETE /api/orders/:id - Remover um pedido
orderRouter.delete("/:id", OrderController.delete);

export default orderRouter;
