import prisma from "../../prisma/prisma.js";

class UserModel {
  // Obter todas os pedidos
  async findAll() {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    return users;
  }

  // Obter um usuário pelo ID
  async findById(id_user) {
    const user = await prisma.user.findUnique({
      where: { 
        id: Number(id_user),
      },
    });

    return user;
  }

  // Criar um novo usuário
  async create(id_user, nickname, password, orders) {
    const newUser = await prisma.user.create({
      data: {
        id_user,
        nickname,
        password,
        orders,
      },
    });

    return newUser;
  }

  // Atualizar um usuário
  async update(id_user, nickname, password, orders) {
    const user = await this.findById(id_user);

    if (!user) {
      return null;
    }

    // Atualiza apenas os campos que foram enviados
    const data = {};
    if (id_user !== undefined) data.id_user = id_user;
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
  }

  // Remover um pedido
  async delete(id_user) {
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
  }
}

export default new UserModel();
