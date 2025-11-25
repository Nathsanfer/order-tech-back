import OrderModel from "../models/orderModel.js";
import UserModel from "../models/userModel.js";

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
      const { id } = req.params;

      const order = await OrderModel.findById(id);

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

      if (!id_user || !status || !password_panel || total_cost === undefined) {
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
      const { id } = req.params;
      const { status, password_panel, total_cost } = req.body;

      const updatedOrder = await OrderModel.update(
        id,
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
      const { id } = req.params;

      const result = await OrderModel.delete(id);

      if (!result) {
        return res.status(404).json({ error: "Pedido não encontrado" });
      }

      res.status(204).end(); // Resposta sem conteúdo
    } catch (error) {
      console.error("Erro ao remover pedido:", error);
      res.status(500).json({ error: "Erro ao remover pedido" });
    }
  }


  // POST /api/orders/with-items
  // Payload: { id_user, status, password_panel, items: [{ id_item, quantity, observation }] }
  async createWithItems(req, res) {
    try {
      const { id_user, status, password_panel, items } = req.body;

      if (!id_user || !items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: "Campos obrigatórios: id_user, items (array não vazio)" });
      }

      const created = await OrderModel.createWithItems(id_user, status ?? "pending", password_panel ?? null, items);

      res.status(201).json(created);
    } catch (error) {
      console.error("Erro ao criar pedido com items:", error);
      res.status(500).json({ error: "Erro ao criar pedido com items" });
    }
  }
  // POST /api/orders/with-items
  async createWithItems(req, res) {
    try {
      const { id_user, status, password_panel, items } = req.body;

      if (!id_user || !status || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: "Campos obrigatórios: id_user, status e items (array não vazio)." });
      }

      const result = await OrderModel.createWithItems(id_user, status, password_panel ?? null, items);

      res.status(201).json(result);
    } catch (error) {
      console.error("Erro ao criar pedido com itens:", error);
      res.status(500).json({ error: "Erro ao criar pedido com itens", details: error.message });
    }
  }

  // POST /api/orders/:id/pay
  // Protegido por JWT: obter id_user do token (req.user)
  // Body: { payment_method: 'pix'|'debit'|'credit'|'cash', payment_data? }
  async pay(req, res) {
    try {
      const { id } = req.params;
      const { payment_method, payment_data } = req.body;

      const tokenUser = req.user;
      if (!tokenUser || !tokenUser.id_user) {
        return res.status(401).json({ error: "Usuário não autenticado" });
      }

      if (!payment_method) {
        return res.status(400).json({ error: "Campo obrigatório: payment_method" });
      }

      const order = await OrderModel.findById(id);
      if (!order) return res.status(404).json({ error: "Pedido não encontrado" });

      if (Number(order.id_user) !== Number(tokenUser.id_user)) {
        return res.status(403).json({ error: "Pedido não pertence ao usuário autenticado" });
      }

      const total = order.total_cost;

      if (payment_method === "cash") {
        // marcar aguardando pagamento em caixa
        await OrderModel.update(id, "awaiting_cash", undefined, undefined);

        const orderWithItems = await OrderModel.findByIdWithItems(id);

        const receipt = {
          title: "Nota de Venda (simulada)",
          orderId: order.id_order,
          items: orderWithItems.items?.map((it) => ({ id_item: it.id_item, name: it.menu?.name, quantity: it.quantity, price: it.menu?.cost })) ?? [],
          total,
          instructions: "Imprima esta nota e dirija-se ao caixa para efetuar o pagamento em dinheiro.",
          timestamp: new Date().toISOString(),
        };

        return res.json({ payment: "cash", status: "awaiting_cash", receipt });
      }

      // simular transação instantânea para pix/debit/credit
      const txId = `txn_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
      await OrderModel.update(id, "paid", undefined, undefined);

      const paymentResult = {
        transactionId: txId,
        method: payment_method,
        amount: total,
        timestamp: new Date().toISOString(),
        message: "Pagamento simulado aprovado",
      };

      const orderWithItems = await OrderModel.findByIdWithItems(id);

      return res.json({ payment: paymentResult, status: "paid", order: orderWithItems });
    } catch (error) {
      console.error("Erro ao processar pagamento:", error);
      res.status(500).json({ error: "Erro ao processar pagamento", details: error.message });
    }
  }
}

export default new OrderController();
