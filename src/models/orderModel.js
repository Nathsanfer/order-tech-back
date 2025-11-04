import prisma from "../../prisma/prisma.js";

class OrderModel {
  // Obter todas os pedidos
  async findAll() {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    return orders;
  }

  // Obter um pedido pelo ID
  async findById(id_order) {
    const order = await prisma.order.findUnique({
      where: {
        id: Number(id_order),
      },
    });

    return order;
  }

  // Criar um novo pedido
  async create(id_user, status, password_panel, total_cost) {
    const newOrder = await prisma.order.create({
      data: {
        id_user,
        status,
        password_panel,
        total_cost,
      },
    });

    return newOrder;
  }

  // Atualizar um pedido
  async update(id_user, status, password_panel, total_cost) {
    const order = await this.findById(id_order);

    if (!order) {
      return null;
    }

    // Atualiza apenas os campos que foram enviados
    const data = {};
    if (id_user !== undefined) data.id_user = id_user;
    if (status !== undefined) data.status = status;
    if (password_panel !== undefined) data.password_panel = password_panel;
    if (total_cost !== undefined) data.total_cost = total_cost;

    const orderUpdated = await prisma.order.update({
      where: {
        id: Number(id_order),
      },
      data,
    });

    return orderUpdated;
  }

  // Remover um pedido
  async delete(id_order) {
    const order = await this.findById(id_order);

    if (!order) {
      return null;
    }

    await prisma.order.delete({
      where: {
        id: Number(id_order),
      },
    });

    return true;
  }
}

export default new OrderModel();
