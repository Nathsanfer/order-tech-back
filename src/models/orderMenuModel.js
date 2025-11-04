import prisma from "../../prisma/prisma.js";

class OrderMenuModel {
  // Listar todas as relações order_menu
  async findAll() {
    const items = await prisma.order_Menu.findMany({
      include: {
        order: true,
        menu: true,
      },
      orderBy: {
        id_order: "asc",
      },
    });

    return items;
  }

  // Buscar um registro pela chave composta (order, item)
  async findById(id_order, id_item) {
    const record = await prisma.order_Menu.findFirst({
      where: {
        id_order: Number(id_order),
        id_item: Number(id_item),
      },
      include: { order: true, menu: true },
    });

    return record;
  }

  // Criar um novo registro order_menu
  async create(id_order, id_item, quantity, observation) {
    const newRecord = await prisma.order_Menu.create({
      data: {
        id_order: Number(id_order),
        id_item: Number(id_item),
        quantity: Number(quantity),
        observation: observation ?? null,
      },
    });

    return newRecord;
  }

  // Atualizar um registro order_menu
  async update(id_order, id_item, quantity, observation) {
    // Usa updateMany porque o modelo tem chave composta — updateMany com where específico funciona bem
    const data = {};
    if (quantity !== undefined) data.quantity = Number(quantity);
    if (observation !== undefined) data.observation = observation;

    const result = await prisma.order_Menu.updateMany({
      where: {
        id_order: Number(id_order),
        id_item: Number(id_item),
      },
      data,
    });

    if (result.count === 0) return null;

    return this.findById(id_order, id_item);
  }

  // Remover um registro order_menu
  async delete(id_order, id_item) {
    const result = await prisma.order_Menu.deleteMany({
      where: {
        id_order: Number(id_order),
        id_item: Number(id_item),
      },
    });

    return result.count > 0;
  }
}

export default new OrderMenuModel();
