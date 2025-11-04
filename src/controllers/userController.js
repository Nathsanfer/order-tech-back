import UserModel from "../models/userModel.js";

class UserController {
  // GET /api/users
  async getAll(req, res) {
    try {
      const users = await UserModel.findAll();
      const total = users.length;
      
      res.json({
        message: `Total de ${total} usuários${total !== 1 ? 's' : ''} encontrado${total !== 1 ? 's' : ''}`,
        users: users
      });
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      res.status(500).json({ error: "Erro ao buscar usuários" });
    }
  }
  
  // GET /api/users/:id
  async getById(req, res) {
    try {
      const { id_user } = req.params;

      const user = await UserModel.findById(id_user);

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      res.json(user);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      res.status(500).json({ error: "Erro ao buscar usuário" });
    }
  }

  // POST /api/users
  async create(req, res) {
    try {
      const {nickname, password, orders } = req.body;

      if (!nickname || !password || !orders) {
        return res.status(400).json({ error: "Os campos de nome do usuário, senha, e pedidos são obrigatórios" });
      }

      const newUser = await UserModel.create(
        nickname,
        password,
        orders
      );

      if (!newUser) {
        return res.status(400).json({ error: "Erro ao criar usuário" });
      }

      res.status(201).json(newUser);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      res.status(500).json({ error: "Erro ao criar usuário" });
    }
  }
  
  // PUT /api/users/:id
  async update(req, res) {
    try {
      const { id_user } = req.params;
      const { nickname, password, orders } = req.body;

      const updatedUser = await UserModel.update(
        id_user,
        nickname,
        password,
        orders
      );

      if (!updatedUser) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      res.json(updatedUser);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
  }

  // DELETE /api/users/:id
  async delete(req, res) {
    try {
      const { id_user } = req.params;

      const result = await UserModel.delete(id_user);

      if (!result) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      res.status(204).end(); // Resposta sem conteúdo
    } catch (error) {
      console.error("Erro ao remover usuário:", error);
      res.status(500).json({ error: "Erro ao remover usuário" });
    }
  }
}

export default new UserController();
