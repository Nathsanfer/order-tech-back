// Seed com recipes fornecidos pelo usuário
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

function sizeToServings(size) {
  if (!size) return 1;
  const s = String(size).toLowerCase();
  if (s.includes("pequeno") || s.includes("small")) return 1;
  if (s.includes("medio") || s.includes("médio") || s.includes("medium")) return 2;
  if (s.includes("grande") || s.includes("large")) return 4;
  return 1;
}

const recipes = [
  // Lanches
  { name: "Big Smash", category: "Lanche", time: 15, cuisine: "Fast Food", servings: 1, rating: 0, description: "Duplo smash burger 100% bovino, cheddar derretido, picles, cebola grelhada e molho especial da casa no pão brioche amanteigado.", ingredients: "Carne bovina, pão brioche, cheddar, picles, cebola", instructions: "Grelhar carnes e montar no pão.", imageUrl: "https://picsum.photos/seed/bigsmash/600/400" },
  { name: "Fire Bacon", category: "Lanche", time: 15, cuisine: "Fast Food", servings: 1, rating: 0, description: "Hambúrguer de carne premium, cheddar, bacon crocante e molho picante defumado.", ingredients: "Carne, cheddar, bacon, molho picante", instructions: "Grelhar e montar.", imageUrl: "https://picsum.photos/seed/firebacon/600/400" },
  { name: "Golden Crispy Chicken", category: "Lanche", time: 20, cuisine: "Fast Food", servings: 1, rating: 0, description: "Frango empanado super crocante, alface americana, maionese temperada e pão de batata.", ingredients: "Frango empanado, alface, maionese", instructions: "Fritar frango e montar.", imageUrl: "https://picsum.photos/seed/goldenchicken/600/400" },
  { name: "Cheese Lovers", category: "Lanche", time: 15, cuisine: "Fast Food", servings: 1, rating: 0, description: "Hambúrguer bovino duplo com cheddar, queijo prato e molho de queijo cremoso.", ingredients: "Carne, cheddar, queijo prato, molho de queijo", instructions: "Grelhar e montar.", imageUrl: "https://picsum.photos/seed/cheeselovers/600/400" },
  { name: "The Ranch", category: "Lanche", time: 20, cuisine: "BBQ", servings: 1, rating: 0, description: "Hambúrguer de costela bovina desfiada, molho barbecue, queijo cheddar e cebolas caramelizadas.", ingredients: "Costela desfiada, barbecue, cheddar, cebola", instructions: "Preparar costela e montar o sanduíche.", imageUrl: "https://picsum.photos/seed/theranch/600/400" },
  { name: "Veggie Supreme", category: "Lanche Vegetariano", time: 15, cuisine: "Vegetariano", servings: 1, rating: 0, description: "Hambúrguer vegetal com queijo prato, alface, tomate, cebola roxa e maionese de ervas.", ingredients: "Hambúrguer vegetal, queijo, verduras", instructions: "Grelhar hambúrguer vegetal e montar.", imageUrl: "https://picsum.photos/seed/veggiesupreme/600/400" },
  { name: "Spicy Chicken Melt", category: "Lanche", time: 18, cuisine: "Fast Food", servings: 1, rating: 0, description: "Frango grelhado apimentado, queijo cheddar, molho chipotle e pão integral.", ingredients: "Frango, queijo, molho chipotle", instructions: "Grelhar frango e montar.", imageUrl: "https://picsum.photos/seed/spicychicken/600/400" },
  { name: "Fish Deluxe", category: "Lanche", time: 18, cuisine: "Fast Food", servings: 1, rating: 0, description: "Filé de peixe empanado, molho tártaro, queijo e alface no pão de hambúrguer clássico.", ingredients: "Peixe empanado, molho tártaro, queijo", instructions: "Fritar peixe e montar.", imageUrl: "https://picsum.photos/seed/fishdeluxe/600/400" },
  { name: "BBQ Master", category: "Lanche", time: 20, cuisine: "BBQ", servings: 1, rating: 0, description: "Hambúrguer de picanha com queijo prato, bacon, cebola roxa e molho barbecue artesanal.", ingredients: "Picanha, queijo, bacon, barbecue", instructions: "Grelhar picanha e montar.", imageUrl: "https://picsum.photos/seed/bbqmaster/600/400" },
  { name: "Double Classic", category: "Lanche", time: 15, cuisine: "Fast Food", servings: 1, rating: 0, description: "Dois hambúrgueres, queijo cheddar, ketchup, mostarda e picles - o clássico em dobro.", ingredients: "Carne, queijo, condimentos", instructions: "Grelhar e montar.", imageUrl: "https://picsum.photos/seed/doubleclassic/600/400" },
  { name: "Green Power", category: "Lanche Vegetariano", time: 15, cuisine: "Vegetariano", servings: 1, rating: 0, description: "Hambúrguer de lentilha e quinoa com maionese verde e legumes grelhados.", ingredients: "Lentilha, quinoa, legumes", instructions: "Preparar hambúrguer vegetal e montar.", imageUrl: "https://picsum.photos/seed/greenpower/600/400" },
  { name: "Triple King", category: "Lanche", time: 25, cuisine: "Fast Food", servings: 1, rating: 0, description: "Três camadas de carne bovina, triplo queijo, bacon e o molho secreto da casa.", ingredients: "Carne, queijos, bacon, molho secreto", instructions: "Grelhar e montar.", imageUrl: "https://picsum.photos/seed/tripleking/600/400" },

  // Bebidas
  { name: "Refrigerante Coca-Cola", category: "Bebida", time: 2, cuisine: "Bebidas", servings: 1, rating: 0, description: "Clássico refrigerante de cola gelado, perfeito para acompanhar um combo.", ingredients: "Refrigerante", instructions: "Servir gelado.", imageUrl: "https://picsum.photos/seed/cocacola300/600/400" },
  { name: "Refrigerante Coca-Cola (500ml)", category: "Bebida", time: 2, cuisine: "Bebidas", servings: 1, rating: 0, description: "Clássico refrigerante de cola gelado, perfeito para acompanhar um combo.", ingredients: "Refrigerante", instructions: "Servir gelado.", imageUrl: "https://picsum.photos/seed/cocacola500/600/400" },
  { name: "Refrigerante Guaraná", category: "Bebida", time: 2, cuisine: "Bebidas", servings: 1, rating: 0, description: "Tradicional guaraná brasileiro, refrescante e levemente doce.", ingredients: "Refrigerante", instructions: "Servir gelado.", imageUrl: "https://picsum.photos/seed/guarana300/600/400" },
  { name: "Refrigerante Guaraná (500ml)", category: "Bebida", time: 2, cuisine: "Bebidas", servings: 1, rating: 0, description: "Tradicional guaraná brasileiro, refrescante e levemente doce.", ingredients: "Refrigerante", instructions: "Servir gelado.", imageUrl: "https://picsum.photos/seed/guarana500/600/400" },
  { name: "Suco Natural de Laranja", category: "Bebida", time: 3, cuisine: "Bebidas", servings: 1, rating: 0, description: "Suco natural espremido na hora, puro sabor cítrico e refrescante.", ingredients: "Laranja", instructions: "Espremer e servir.", imageUrl: "https://picsum.photos/seed/suco300/600/400" },
  { name: "Suco Natural de Laranja (500ml)", category: "Bebida", time: 3, cuisine: "Bebidas", servings: 1, rating: 0, description: "Suco natural espremido na hora, puro sabor cítrico e refrescante.", ingredients: "Laranja", instructions: "Espremer e servir.", imageUrl: "https://picsum.photos/seed/suco500/600/400" },
  { name: "Limonada da Casa", category: "Bebida", time: 3, cuisine: "Bebidas", servings: 1, rating: 0, description: "Limonada artesanal com hortelã e toque de gengibre, assinatura da casa.", ingredients: "Limão, hortelã, gengibre", instructions: "Preparar e servir gelado.", imageUrl: "https://picsum.photos/seed/limonada300/600/400" },
  { name: "Limonada da Casa (500ml)", category: "Bebida", time: 3, cuisine: "Bebidas", servings: 1, rating: 0, description: "Limonada artesanal com hortelã e toque de gengibre, assinatura da casa.", ingredients: "Limão, hortelã, gengibre", instructions: "Preparar e servir gelado.", imageUrl: "https://picsum.photos/seed/limonada500/600/400" },
  { name: "Gin Lemon Fresh", category: "Drink Alcoólico", time: 5, cuisine: "Drinks", servings: 1, rating: 0, description: "Drink refrescante de gin com limão-siciliano e hortelã, servido bem gelado.", ingredients: "Gin, limão, hortelã", instructions: "Preparar e servir gelado.", imageUrl: "https://picsum.photos/seed/gin300/600/400" },
  { name: "Gin Lemon Fresh (500ml)", category: "Drink Alcoólico", time: 5, cuisine: "Drinks", servings: 1, rating: 0, description: "Drink refrescante de gin com limão-siciliano e hortelã, servido bem gelado.", ingredients: "Gin, limão, hortelã", instructions: "Preparar e servir gelado.", imageUrl: "https://picsum.photos/seed/gin500/600/400" },
  { name: "Whisky Cola", category: "Drink Alcoólico", time: 3, cuisine: "Drinks", servings: 1, rating: 0, description: "Combinação clássica de whisky e refrigerante de cola intenso e equilibrado.", ingredients: "Whisky, refrigerante", instructions: "Preparar e servir.", imageUrl: "https://picsum.photos/seed/whisky300/600/400" },
  { name: "Whisky Cola (500ml)", category: "Drink Alcoólico", time: 3, cuisine: "Drinks", servings: 1, rating: 0, description: "Combinação clássica de whisky e refrigerante de cola intenso e equilibrado.", ingredients: "Whisky, refrigerante", instructions: "Preparar e servir.", imageUrl: "https://picsum.photos/seed/whisky500/600/400" },

  // Acompanhamentos
  { name: "Batata Frita com Cheddar e Bacon (Pequeno)", category: "Acompanhamento", time: 10, cuisine: "Fast Food", servings: 1, rating: 0, description: "A batata frita vem acompanhada com o cheddar e bacon.", ingredients: "Batata, cheddar, bacon", instructions: "Fritar e servir.", imageUrl: "https://picsum.photos/seed/batata1/600/400" },
  { name: "Batata Frita com Cheddar e Bacon (Médio)", category: "Acompanhamento", time: 10, cuisine: "Fast Food", servings: 2, rating: 0, description: "A batata frita vem acompanhada com o cheddar e bacon.", ingredients: "Batata, cheddar, bacon", instructions: "Fritar e servir.", imageUrl: "https://picsum.photos/seed/batata2/600/400" },
  { name: "Batata Frita com Cheddar e Bacon (Grande)", category: "Acompanhamento", time: 10, cuisine: "Fast Food", servings: 4, rating: 0, description: "A batata frita vem acompanhada com o cheddar e bacon.", ingredients: "Batata, cheddar, bacon", instructions: "Fritar e servir.", imageUrl: "https://picsum.photos/seed/batata3/600/400" },
  { name: "Nuggets (Pequeno)", category: "Acompanhamento", time: 12, cuisine: "Fast Food", servings: 1, rating: 0, description: "Vem acompanhado com 6 Nuggets", ingredients: "Frango empanado", instructions: "Fritar e servir.", imageUrl: "https://picsum.photos/seed/nuggets1/600/400" },
  { name: "Nuggets (Médio)", category: "Acompanhamento", time: 12, cuisine: "Fast Food", servings: 2, rating: 0, description: "Vem acompanhado com 8 Nuggets", ingredients: "Frango empanado", instructions: "Fritar e servir.", imageUrl: "https://picsum.photos/seed/nuggets2/600/400" },
  { name: "Nuggets (Grande)", category: "Acompanhamento", time: 12, cuisine: "Fast Food", servings: 4, rating: 0, description: "Vem acompanhado com 12 Nuggets", ingredients: "Frango empanado", instructions: "Fritar e servir.", imageUrl: "https://picsum.photos/seed/nuggets3/600/400" },
  { name: "Mini Coxinha (Pequeno)", category: "Acompanhamento", time: 15, cuisine: "Fast Food", servings: 1, rating: 0, description: "Vem acompanhado com 8 Mini coxinhas", ingredients: "Frango desfiado, massa", instructions: "Fritar e servir.", imageUrl: "https://picsum.photos/seed/coxinha1/600/400" },
  { name: "Mini Coxinha (Médio)", category: "Acompanhamento", time: 15, cuisine: "Fast Food", servings: 2, rating: 0, description: "Vem acompanhado com 12 Mini coxinhas", ingredients: "Frango desfiado, massa", instructions: "Fritar e servir.", imageUrl: "https://picsum.photos/seed/coxinha2/600/400" },
  { name: "Mini Coxinha (Grande)", category: "Acompanhamento", time: 15, cuisine: "Fast Food", servings: 4, rating: 0, description: "Vem acompanhado com 18 Mini coxinhas", ingredients: "Frango desfiado, massa", instructions: "Fritar e servir.", imageUrl: "https://picsum.photos/seed/coxinha3/600/400" },
  { name: "Batata Sorriso (Pequeno)", category: "Acompanhamento", time: 10, cuisine: "Fast Food", servings: 1, rating: 0, description: "Vem acompanhado com 8 Batata sorriso", ingredients: "Batata", instructions: "Fritar e servir.", imageUrl: "https://picsum.photos/seed/sorriso1/600/400" },
  { name: "Batata Sorriso (Médio)", category: "Acompanhamento", time: 10, cuisine: "Fast Food", servings: 2, rating: 0, description: "Vem acompanhado com 12 Batata sorriso", ingredients: "Batata", instructions: "Fritar e servir.", imageUrl: "https://picsum.photos/seed/sorriso2/600/400" },
  { name: "Batata Sorriso (Grande)", category: "Acompanhamento", time: 10, cuisine: "Fast Food", servings: 4, rating: 0, description: "Vem acompanhado com 16 Batata sorriso", ingredients: "Batata", instructions: "Fritar e servir.", imageUrl: "https://picsum.photos/seed/sorriso3/600/400" },
  { name: "Batata Frita (Pequeno)", category: "Acompanhamento", time: 10, cuisine: "Fast Food", servings: 1, rating: 0, description: "Vem acompanhado com 100g de batata frita.", ingredients: "Batata", instructions: "Fritar e servir.", imageUrl: "https://picsum.photos/seed/batataf1/600/400" },
  { name: "Batata Frita (Médio)", category: "Acompanhamento", time: 10, cuisine: "Fast Food", servings: 2, rating: 0, description: "Vem acompanhado com 180g de batata frita.", ingredients: "Batata", instructions: "Fritar e servir.", imageUrl: "https://picsum.photos/seed/batataf2/600/400" },
  { name: "Batata Frita (Grande)", category: "Acompanhamento", time: 10, cuisine: "Fast Food", servings: 4, rating: 0, description: "Vem acompanhado com 230g de batata frita.", ingredients: "Batata", instructions: "Fritar e servir.", imageUrl: "https://picsum.photos/seed/batataf3/600/400" },

  // Sobremesas
  { name: "Pudim de Leite Condensado Artesanal", category: "Sobremesa", time: 60, cuisine: "Sobremesa", servings: 1, rating: 0, description: "O clássico da vovó, inigualável. Textura incrivelmente lisa e aveludada, banhada em uma calda de caramelo.", ingredients: "Leite condensado, ovos, açúcar", instructions: "Assar em banho-maria e resfriar.", imageUrl: "https://picsum.photos/seed/pudim/600/400" },
  { name: "Torta Banoffee Crocante", category: "Sobremesa", time: 45, cuisine: "Sobremesa", servings: 1, rating: 0, description: "Base de biscoito amanteigado, coberta com doce de leite, bananas e chantilly.", ingredients: "Biscoito, doce de leite, banana, chantilly", instructions: "Montar e gelar.", imageUrl: "https://picsum.photos/seed/banoffee/600/400" },
  { name: "Brownie Supremo com Sorvete", category: "Sobremesa", time: 25, cuisine: "Sobremesa", servings: 1, rating: 0, description: "Brownie premium servido quente com sorvete de baunilha.", ingredients: "Chocolate, manteiga, ovos, açúcar", instructions: "Assar e servir com sorvete.", imageUrl: "https://picsum.photos/seed/brownie/600/400" },
  { name: "Mousse de Maracujá Cremoso", category: "Sobremesa", time: 20, cuisine: "Sobremesa", servings: 1, rating: 0, description: "Mousse aerado de maracujá com geleia artesanal.", ingredients: "Maracujá, creme de leite, açúcar", instructions: "Bater e gelar.", imageUrl: "https://picsum.photos/seed/mousse/600/400" },
  { name: "Churros Gourmet c/ Doce de Leite", category: "Sobremesa", time: 15, cuisine: "Sobremesa", servings: 1, rating: 0, description: "Palitos de churros caseiros servidos com doce de leite.", ingredients: "Massa de churros, açúcar, doce de leite", instructions: "Fritar e servir com doce.", imageUrl: "https://picsum.photos/seed/churros/600/400" },
];

async function main() {
  console.log("Iniciando seed de recipes...\nTotal a inserir:", recipes.length);

  // criar um usuário de exemplo (admin) com senha hasheada
  const adminPasswordPlain = process.env.SEED_ADMIN_PWD || "changeme123";
  const adminHash = await bcrypt.hash(adminPasswordPlain, 10);
  await prisma.user.create({ data: { nickname: "admin", password: adminHash } });

  // opcional: limpar receitas existentes
  // await prisma.recipe.deleteMany({});

  for (const r of recipes) {
    await prisma.recipe.create({ data: r });
  }

  const total = await prisma.recipe.count();
  console.log(`Seed concluído. Total de recipes no banco: ${total}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
