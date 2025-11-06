import UserModel from "../models/userModel.js";

class UserController {
  // GET /api/users
  async getAll(req, res) {
    try {
      const users = await UserModel.findAll();
      const total = users.length;

      // remover password das respostas
      const safeUsers = users.map(u => ({ id_user: u.id_user, nickname: u.nickname, createdAt: u.createdAt, updatedAt: u.updatedAt }));

      res.json({
        message: `Total de ${total} usuário${total !== 1 ? 's' : ''} encontrado${total !== 1 ? 's' : ''}`,
        users: safeUsers,
      });
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      res.status(500).json({ error: "Erro ao buscar usuários" });
    }
  }

  // GET /api/users/:id
  async getById(req, res) {
    try {
      const { id } = req.params;

      const user = await UserModel.findById(id);

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      // remover password antes de responder
      const safeUser = { id_user: user.id_user, nickname: user.nickname, createdAt: user.createdAt, updatedAt: user.updatedAt };

      res.json(safeUser);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      res.status(500).json({ error: "Erro ao buscar usuário" });
    }
  }

  // POST /api/users
  async create(req, res) {
    try {
      const { nickname, password, orders } = req.body;

      if (!nickname || !password) {
        return res.status(400).json({ error: "Os campos 'nickname' e 'password' são obrigatórios." });
      }

      const newUser = await UserModel.create(nickname, password, orders);

      res.status(201).json(newUser);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      res.status(500).json({ error: "Erro ao criar usuário" });
    }
  }

  // PUT /api/users/:id
  async update(req, res) {
    try {
      const { id } = req.params;
      const { nickname, password, orders } = req.body;

      const updatedUser = await UserModel.update(id, nickname, password, orders);

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
      const { id } = req.params;

      const result = await UserModel.delete(id);

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