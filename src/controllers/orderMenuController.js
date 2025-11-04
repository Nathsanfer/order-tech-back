import OrderMenuModel from "../models/orderMenuModel.js";

class OrderMenuController {
  // GET /order_menu
  async getAll(req, res) {
    try {
      const items = await OrderMenuModel.findAll();
      res.json({ message: `Total de ${items.length} itens`, items });
    } catch (error) {
      console.error("Erro ao buscar order_menu:", error);
      res.status(500).json({ error: "Erro ao buscar order_menu" });
    }
  }

  // GET /order_menu/:orderId/:itemId
  async getById(req, res) {
    try {
      const { orderId, itemId } = req.params;
      const record = await OrderMenuModel.findById(orderId, itemId);

      if (!record) return res.status(404).json({ error: "Registro não encontrado" });

      res.json(record);
    } catch (error) {
      console.error("Erro ao buscar registro order_menu:", error);
      res.status(500).json({ error: "Erro ao buscar registro" });
    }
  }

  // POST /order_menu
  async create(req, res) {
    try {
      const { id_order, id_item, quantity, observation } = req.body;

      if (!id_order || !id_item || quantity === undefined) {
        return res.status(400).json({ error: "Os campos id_order, id_item e quantity são obrigatórios" });
      }

      const created = await OrderMenuModel.create(id_order, id_item, quantity, observation);

      res.status(201).json(created);
    } catch (error) {
      console.error("Erro ao criar registro order_menu:", error);
      res.status(500).json({ error: "Erro ao criar registro" });
    }
  }

  // PUT /order_menu/:orderId/:itemId
  async update(req, res) {
    try {
      const { orderId, itemId } = req.params;
      const { quantity, observation } = req.body;

      const updated = await OrderMenuModel.update(orderId, itemId, quantity, observation);

      if (!updated) return res.status(404).json({ error: "Registro não encontrado" });

      res.json(updated);
    } catch (error) {
      console.error("Erro ao atualizar registro order_menu:", error);
      res.status(500).json({ error: "Erro ao atualizar registro" });
    }
  }

  // DELETE /order_menu/:orderId/:itemId
  async delete(req, res) {
    try {
      const { orderId, itemId } = req.params;

      const removed = await OrderMenuModel.delete(orderId, itemId);

      if (!removed) return res.status(404).json({ error: "Registro não encontrado" });

      res.status(204).end();
    } catch (error) {
      console.error("Erro ao remover registro order_menu:", error);
      res.status(500).json({ error: "Erro ao remover registro" });
    }
  }
}

export default new OrderMenuController();
