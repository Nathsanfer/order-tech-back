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
        id_order: Number(id_order),
      },
    });

    return order;
  }

  // Criar um novo pedido
  async create(id_user, status, password_panel, total_cost) {
    const newOrder = await prisma.order.create({
      data: {
        id_user: Number(id_user),
        status,
        password_panel,
        total_cost,
      },
    });

    return newOrder;
  }

  // Criar um pedido e seus itens em uma transação
  // items: [{ id_item, quantity, observation }]
  async createWithItems(id_user, status, password_panel, items) {
    // buscar preços dos items
    const ids = items.map((i) => Number(i.id_item));
    const menuRows = await prisma.menu.findMany({ where: { id_item: { in: ids } } });
    const priceMap = new Map(menuRows.map((m) => [m.id_item, m.cost]));

    // calcular total
    let total = 0;
    for (const it of items) {
      const cost = priceMap.get(Number(it.id_item));
      if (cost === undefined) throw new Error(`Item não encontrado: ${it.id_item}`);
      total += cost * Number(it.quantity);
    }

    // transaction: criar order e order_menu entries
    const created = await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({ data: { id_user: Number(id_user), status, password_panel, total_cost: total } });

      for (const it of items) {
        await tx.order_Menu.create({
          data: {
            id_order: order.id_order,
            id_item: Number(it.id_item),
            quantity: Number(it.quantity),
            observation: it.observation ?? null,
          },
        });
      }

      return tx.order.findUnique({ where: { id_order: order.id_order }, include: { items: { include: { menu: true } } } });
    });

    return created;
  }

  // Criar pedido com itens em transação
  // items: [{ id_item, quantity, observation? }]
  async createWithItems(id_user, status, password_panel, items) {
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error("Items array is required");
    }

    const result = await prisma.$transaction(async (tx) => {
      // cria o pedido com total 0 temporariamente
      const createdOrder = await tx.order.create({
        data: {
          id_user: Number(id_user),
          status,
          password_panel,
          total_cost: 0,
        },
      });

      // buscar os preços dos itens em lote
      const ids = items.map((it) => Number(it.id_item));
      const menus = await tx.menu.findMany({ where: { id_item: { in: ids } } });

      let total = 0;
      // criar registros order_menu
      for (const it of items) {
        const id_item = Number(it.id_item);
        const quantity = Number(it.quantity);
        const menu = menus.find((m) => m.id_item === id_item);
        if (!menu) throw new Error(`Menu item not found: ${id_item}`);
        total += menu.cost * quantity;

        await tx.order_Menu.create({
          data: {
            id_order: createdOrder.id_order,
            id_item,
            quantity,
            observation: it.observation ?? null,
          },
        });
      }

      // atualizar total do pedido
      const updatedOrder = await tx.order.update({
        where: { id_order: createdOrder.id_order },
        data: { total_cost: total },
      });

      const createdItems = await tx.order_Menu.findMany({ where: { id_order: createdOrder.id_order }, include: { menu: true } });

      return { order: updatedOrder, items: createdItems };
    });

    return result;
  }

  // Atualizar um pedido
  async update(id_order, status, password_panel, total_cost) {
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
        id_order: Number(id_order),
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
        id_order: Number(id_order),
      },
    });

    return true;
  }
}

export default new OrderModel();
