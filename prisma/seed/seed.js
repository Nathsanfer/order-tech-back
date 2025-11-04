import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Seed especificamente para popular o model Menu (tabela `items`).
// Este seed é idempotente: por padrão ele limpa a tabela antes de inserir.
// Para evitar limpeza, execute com SEED_CLEAN=0.

const items = [
  // Lanches
  { name: "Big Smash", type: "Lanche", description: "Duplo smash burger 100% bovino, cheddar derretido, picles, cebola grelhada e molho especial da casa no pão brioche amanteigado.", cost: 25.0, size: null },
  { name: "Fire Bacon", type: "Lanche", description: "Hambúrguer de carne premium, cheddar, bacon crocante e molho picante defumado.", cost: 27.0, size: null },
  { name: "Golden Crispy Chicken", type: "Lanche", description: "Frango empanado super crocante, alface americana, maionese temperada e pão de batata.", cost: 24.0, size: null },
  { name: "Cheese Lovers", type: "Lanche", description: "Hambúrguer bovino duplo com cheddar, queijo prato e molho de queijo cremoso.", cost: 28.0, size: null },
  { name: "The Ranch", type: "Lanche", description: "Hambúrguer de costela bovina desfiada, molho barbecue, queijo cheddar e cebolas caramelizadas.", cost: 26.0, size: null },
  { name: "Veggie Supreme", type: "Lanche Vegetariano", description: "Hambúrguer vegetal com queijo prato, alface, tomate, cebola roxa e maionese de ervas.", cost: 23.0, size: null },
  { name: "Spicy Chicken Melt", type: "Lanche", description: "Frango grelhado apimentado, queijo cheddar, molho chipotle e pão integral.", cost: 25.0, size: null },
  { name: "Fish Deluxe", type: "Lanche", description: "Filé de peixe empanado, molho tártaro, queijo e alface no pão de hambúrguer clássico.", cost: 23.0, size: null },
  { name: "BBQ Master", type: "Lanche", description: "Hambúrguer de picanha com queijo prato, bacon, cebola roxa e molho barbecue artesanal.", cost: 27.0, size: null },
  { name: "Double Classic", type: "Lanche", description: "Dois hambúrgueres, queijo cheddar, ketchup, mostarda e picles - o clássico em dobro.", cost: 25.0, size: null },
  { name: "Green Power", type: "Lanche Vegetariano", description: "Hambúrguer de lentilha e quinoa com maionese verde e legumes grelhados.", cost: 22.0, size: null },
  { name: "Triple King", type: "Lanche", description: "Três camadas de carne bovina, triplo queijo, bacon e o molho secreto da casa.", cost: 31.0, size: null },

  // Bebidas
  { name: "Refrigerante Coca-Cola", type: "Bebida", description: "Clássico refrigerante de cola gelado, perfeito para acompanhar um combo.", cost: 7.0, size: "300ml" },
  { name: "Refrigerante Coca-Cola", type: "Bebida", description: "Clássico refrigerante de cola gelado, perfeito para acompanhar um combo.", cost: 9.0, size: "500ml" },
  { name: "Refrigerante Guaraná", type: "Bebida", description: "Tradicional guaraná brasileiro, refrescante e levemente doce.", cost: 7.0, size: "300ml" },
  { name: "Refrigerante Guaraná", type: "Bebida", description: "Tradicional guaraná brasileiro, refrescante e levemente doce.", cost: 9.0, size: "500ml" },
  { name: "Suco Natural de Laranja", type: "Bebida", description: "Suco natural espremido na hora, puro sabor cítrico e refrescante.", cost: 8.0, size: "300ml" },
  { name: "Suco Natural de Laranja", type: "Bebida", description: "Suco natural espremido na hora, puro sabor cítrico e refrescante.", cost: 10.0, size: "500ml" },
  { name: "Limonada da Casa", type: "Bebida", description: "Limonada artesanal com hortelã e toque de gengibre, assinatura da casa.", cost: 9.0, size: "300ml" },
  { name: "Limonada da Casa", type: "Bebida", description: "Limonada artesanal com hortelã e toque de gengibre, assinatura da casa.", cost: 11.0, size: "500ml" },
  { name: "Gin Lemon Fresh", type: "Drink Alcoólico", description: "Drink refrescante de gin com limão-siciliano e hortelã, servido bem gelado.", cost: 20.0, size: "300ml" },
  { name: "Gin Lemon Fresh", type: "Drink Alcoólico", description: "Drink refrescante de gin com limão-siciliano e hortelã, servido bem gelado.", cost: 24.0, size: "500ml" },
  { name: "Whisky Cola", type: "Drink Alcoólico", description: "Combinação clássica de whisky e refrigerante de cola intenso e equilibrado.", cost: 18.0, size: "300ml" },
  { name: "Whisky Cola", type: "Drink Alcoólico", description: "Combinação clássica de whisky e refrigerante de cola intenso e equilibrado.", cost: 22.0, size: "500ml" },

  // Acompanhamentos (Batata com Cheddar e Bacon)
  { name: "Batata Frita com Cheddar e Bacon", type: "Acompanhamento", description: "A batata frita vem acompanhada com o cheddar e bacon.", cost: 8.5, size: "Pequeno" },
  { name: "Batata Frita com Cheddar e Bacon", type: "Acompanhamento", description: "A batata frita vem acompanhada com o cheddar e bacon.", cost: 11.5, size: "Médio" },
  { name: "Batata Frita com Cheddar e Bacon", type: "Acompanhamento", description: "A batata frita vem acompanhada com o cheddar e bacon.", cost: 15.0, size: "Grande" },

  // Nuggets
  { name: "Nuggets", type: "Acompanhamento", description: "Vem acompanhado com 6 Nuggets", cost: 7.5, size: "Pequeno" },
  { name: "Nuggets", type: "Acompanhamento", description: "Vem acompanhado com 8 Nuggets", cost: 8.5, size: "Médio" },
  { name: "Nuggets", type: "Acompanhamento", description: "Vem acompanhado com 12 Nuggets", cost: 10.0, size: "Grande" },

  // Mini Coxinha
  { name: "Mini Coxinha", type: "Acompanhamento", description: "Vem acompanhado com 8 Mini coxinhas", cost: 9.5, size: "Pequeno" },
  { name: "Mini Coxinha", type: "Acompanhamento", description: "Vem acompanhado com 12 Mini coxinhas", cost: 11.0, size: "Médio" },
  { name: "Mini Coxinha", type: "Acompanhamento", description: "Vem acompanhado com 18 Mini coxinhas", cost: 15.0, size: "Grande" },

  // Batata Sorriso
  { name: "Batata Sorriso", type: "Acompanhamento", description: "Vem acompanhado com 8 Batata sorriso", cost: 7.5, size: "Pequeno" },
  { name: "Batata Sorriso", type: "Acompanhamento", description: "Vem acompanhado com 12 Batata sorriso", cost: 9.5, size: "Médio" },
  { name: "Batata Sorriso", type: "Acompanhamento", description: "Vem acompanhado com 16 Batata sorriso", cost: 9.5, size: "Grande" },

  // Batata Frita simples
  { name: "Batata Frita", type: "Acompanhamento", description: "Vem acompanhado com 100g de batata frita.", cost: 7.0, size: "Pequeno" },
  { name: "Batata Frita", type: "Acompanhamento", description: "Vem acompanhado com 180g de batata frita.", cost: 10.0, size: "Médio" },
  { name: "Batata Frita", type: "Acompanhamento", description: "Vem acompanhado com 230g de batata frita.", cost: 15.0, size: "Grande" },

  // Sobremesas
  { name: "Pudim de Leite Condensado Artesanal", type: "Sobremesa", description: "O clássico da vovó, inigualável. Textura incrivelmente lisa e aveludada, banhada em uma calda de caramelo escura e brilhante.", cost: 15.0, size: "Individual (150g)" },
  { name: "Torta Banoffee Crocante", type: "Sobremesa", description: "Base de biscoito amanteigado, coberta com doce de leite, bananas e chantilly.", cost: 18.5, size: "Fatia Generosa" },
  { name: "Brownie Supremo com Sorvete", type: "Sobremesa", description: "Brownie premium servido quente com sorvete de baunilha.", cost: 22.0, size: "Individual (200g)" },
  { name: "Mousse de Maracujá Cremoso", type: "Sobremesa", description: "Mousse aerado de maracujá com geleia artesanal.", cost: 14.0, size: "Taça (180ml)" },
  { name: "Churros Gourmet c/ Doce de Leite", type: "Sobremesa", description: "Palitos de churros caseiros servidos com doce de leite.", cost: 16.5, size: "4 Unidades" },
];

async function main() {
  const shouldClean = process.env.SEED_CLEAN !== "0";
  if (shouldClean) {
    console.log("Limpando tabela 'items' (Menu)...");
    await prisma.menu.deleteMany({});
  }

  for (const it of items) {
    // criar cada item; se já existir um item com mesmo name/type/size, atualizamos
    const exists = await prisma.menu.findFirst({ where: { name: it.name, type: it.type, size: it.size } });
    if (exists) {
      await prisma.menu.update({ where: { id_item: exists.id_item }, data: it });
    } else {
      await prisma.menu.create({ data: it });
    }
  }

  const total = await prisma.menu.count();
  console.log(`Seed de Menu concluído. Total de items na tabela: ${total}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
