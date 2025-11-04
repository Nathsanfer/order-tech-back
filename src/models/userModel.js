import prisma from "../../prisma/prisma.js";

class UserModel {
  // Obter todos os usuários
  async findAll() {
    try {
      const users = await prisma.user.findMany({
        orderBy: {
          createdAt: "asc",
        },
      });

      return users;
    } catch (error) {
      console.error("Erro ao buscar todos os usuários:", error);
      throw new Error("Erro ao buscar usuários.");
    }
  }

  // Obter um usuário pelo ID
  async findById(id_user) {
    try {
      if (!id_user) {
        throw new Error("ID do usuário é obrigatório.");
      }

      const user = await prisma.user.findUnique({
        where: {
          id: Number(id_user),
        },
      });

      return user;
    } catch (error) {
      console.error(`Erro ao buscar usuário com ID ${id_user}:`, error);
      throw new Error("Erro ao buscar usuário.");
    }
  }

  // Criar um novo usuário
  async create(nickname, password, orders) {
    try {
      if (!nickname || !password) {
        throw new Error("Nickname e senha são obrigatórios.");
      }

      const newUser = await prisma.user.create({
        data: {
          nickname,
          password,
          orders,
        },
      });

      return newUser;
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      throw new Error("Erro ao criar usuário.");
    }
  }

  // Atualizar um usuário
  async update(id_user, nickname, password, orders) {
    try {
      if (!id_user) {
        throw new Error("ID do usuário é obrigatório.");
      }

      const user = await this.findById(id_user);

      if (!user) {
        return null;
      }

      // Atualiza apenas os campos que foram enviados
      const data = {};
      if (nickname !== undefined) data.nickname = nickname;
      if (password !== undefined) data.password = password;
      if (orders !== undefined) data.orders = orders;

      const userUpdated = await prisma.user.update({
        where: {
          id: Number(id_user),
        },
        data,
      });

      return userUpdated;
    } catch (error) {
      console.error(`Erro ao atualizar usuário com ID ${id_user}:`, error);
      throw new Error("Erro ao atualizar usuário.");
    }
  }

  // Remover um usuário
  async delete(id_user) {
    try {
      if (!id_user) {
        throw new Error("ID do usuário é obrigatório.");
      }

      const user = await this.findById(id_user);

      if (!user) {
        return null;
      }

      await prisma.user.delete({
        where: {
          id: Number(id_user),
        },
      });

      return true;
    } catch (error) {
      console.error(`Erro ao deletar usuário com ID ${id_user}:`, error);
      throw new Error("Erro ao deletar usuário.");
    }
  }
}

export default new UserModel();