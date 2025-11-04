import MenuModel from "../models/menuModel.js";

class MenuController {
  // GET /api/menu
  async getAll(req, res) {
    try {
      const items = await MenuModel.findAll();
      const total = items.length;
      
      res.json({
        message: `Total de ${total} produto${total !== 1 ? 's' : ''} encontrado${total !== 1 ? 's' : ''}`,
        items: items
      });
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      res.status(500).json({ error: "Erro ao buscar produtos" });
    }
  }
  
  // GET /api/menu/:id
  async getById(req, res) {
    try {
      const { id } = req.params;

      const item = await MenuModel.findById(id);

      if (!item) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }

      res.json(item);
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
      res.status(500).json({ error: "Erro ao buscar produto" });
    }
  }

  // POST /api/menu
  async create(req, res) {
    try {
      const { name, type, description, cost, size, imageUrl } = req.body;

      if (!name || !type || !description || !cost || !imageUrl) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
      }

      const newItem = await MenuModel.create(
        name,
        type,
        description,
        cost,
        size,
        imageUrl
      );

      if (!newItem) {
        return res.status(400).json({ error: "Erro ao criar produto" });
      }

      res.status(201).json(newItem);
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      res.status(500).json({ error: "Erro ao criar produto" });
    }
  }
  
  // PUT /api/menu/:id
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, type, description, cost, size, imageUrl } = req.body;

      const updatedItem = await MenuModel.update(
        id,
        name,
        type,
        description,
        cost,
        size,
        imageUrl
      );

      if (!updatedItem) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }

      res.json(updatedItem);
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      res.status(500).json({ error: "Erro ao atualizar produto" });
    }
  }

  // DELETE /api/menu/:id
  async delete(req, res) {
    try {
      const { id } = req.params;

      const result = await MenuModel.delete(id);

      if (!result) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }

      res.status(204).end(); // Resposta sem conteúdo
    } catch (error) {
      console.error("Erro ao remover produto:", error);
      res.status(500).json({ error: "Erro ao remover produto" });
    }
  }
}

export default new MenuController();
