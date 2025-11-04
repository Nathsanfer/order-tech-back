import OrderModel from "../models/orderModel.js";

class OrderController {
  // GET /api/orders
  async getAll(req, res) {
    try {
      const orders = await OrderModel.findAll();
      const total = orders.length;
      
      res.json({
        message: `Total de ${total} pedidos${total !== 1 ? 's' : ''} encontrada${total !== 1 ? 's' : ''}`,
        orders: orders
      });
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
      res.status(500).json({ error: "Erro ao buscar pedidos" });
    }
  }
  
  // GET /api/orders/:id
  async getById(req, res) {
    try {
      const { id_order } = req.params;

      const order = await OrderModel.findById(id_order);

      if (!order) {
        return res.status(404).json({ error: "Pedido não encontrado" });
      }

      res.json(order);
    } catch (error) {
      console.error("Erro ao buscar pedido:", error);
      res.status(500).json({ error: "Erro ao buscar pedido" });
    }
  }

  // POST /api/orders
  async create(req, res) {
    try {
      const { id_user, status, password_panel, total_cost } = req.body;

      if (!id_user || !status || !password_panel || !total_cost) {
        return res.status(400).json({ error: "Os campos de ID do usuário, status do pedido, senha do painel e total do pedido são obrigatórios" });
      }

      const newOrder = await OrderModel.create(
        id_user,
        status,
        password_panel,
        total_cost
      );

      if (!newOrder) {
        return res.status(400).json({ error: "Erro ao criar pedido" });
      }

      res.status(201).json(newOrder);
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      res.status(500).json({ error: "Erro ao criar pedido" });
    }
  }
  
  // PUT /api/orders/:id
  async update(req, res) {
    try {
      const { id_order } = req.params;
      const { status, password_panel, total_cost } = req.body;

      const updatedOrder = await OrderModel.update(
        id_order,
        status,
        password_panel,
        total_cost
      );

      if (!updatedOrder) {
        return res.status(404).json({ error: "Pedido não encontrado" });
      }

      res.json(updatedOrder);
    } catch (error) {
      console.error("Erro ao atualizar pedido:", error);
      res.status(500).json({ error: "Erro ao atualizar pedido" });
    }
  }

  // DELETE /api/orders/:id
  async delete(req, res) {
    try {
      const { id_order } = req.params;

      const result = await OrderModel.delete(id_order);

      if (!result) {
        return res.status(404).json({ error: "Pedido não encontrado" });
      }

      res.status(204).end(); // Resposta sem conteúdo
    } catch (error) {
      console.error("Erro ao remover pedido:", error);
      res.status(500).json({ error: "Erro ao remover pedido" });
    }
  }
}

export default new OrderController();
