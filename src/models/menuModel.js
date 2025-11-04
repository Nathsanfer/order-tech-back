import prisma from "../../prisma/prisma.js";

class MenuModel {
  // Obter todos os itens do menu 
  async findAll() {
    const items = await prisma.menu.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    return items;
  }

  // Obter um item do menu pelo ID
  async findById(id) {
    const item = await prisma.menu.findUnique({
      where: {
        id_item: Number(id),
      },
    });

    return item;
  }

  // Criar um novo item do menu
  async create(name, type, description, cost, size, imageUrl) {
    const newItem = await prisma.menu.create({
      data: {
        name, 
        type, 
        description, 
        cost, 
        size,
        imageUrl
      },
    });

    return newItem;
  }

  // Atualizar um item do menu
  async update(id, name, type, description, cost, size, imageUrl) {
    const item = await this.findById(id);

    if (!item) {
      return null;
    }

    // Atualiza apenas os campos que foram enviados
    const data = {};
    if (name !== undefined) data.name = name;
    if (type !== undefined) data.type = type;
    if (description !== undefined) data.description = description;
    if (cost !== undefined) data.cost = cost;
    if (size !== undefined) data.size = size;
    if (imageUrl !== undefined) data.imageUrl = imageUrl;

    const itemUpdated = await prisma.menu.update({
      where: {
        id_item: Number(id),
      },
      data,
    });

    return itemUpdated;
  }

  // Remover um item do menu
  async delete(id) {
    const item = await this.findById(id);

    if (!item) {
      return null;
    }

    await prisma.menu.delete({
      where: {
        id_item: Number(id),
      },
    });

    return true;
  }
}

export default new MenuModel();
