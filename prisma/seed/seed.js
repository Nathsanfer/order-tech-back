import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando o seed de receitas...");

  // Limpar banco de dados antes de inserir novos dados
  await prisma.recipe.deleteMany({});

  console.log("Inserindo receitas...");

  // Receitas Brasileiras
  const receitasBrasileiras = await Promise.all([
    prisma.recipe.create({
      data: {
        name: "Feijoada Completa",
        category: "Prato Principal",
        time: 180,
        cuisine: "Brasileira",
        servings: 8,
        rating: 4.9,
        description: "A mais tradicional receita brasileira com feijão preto, carnes variadas e acompanhamentos típicos.",
        ingredients: "1kg de feijão preto, 500g de costela de porco, 300g de linguiça calabresa, 200g de bacon, 300g de carne seca, 2 folhas de louro, alho, cebola, sal e pimenta",
        instructions: "Deixe o feijão de molho na noite anterior. Cozinhe as carnes separadamente e depois junte com o feijão. Refogue alho e cebola, adicione ao feijão e deixe cozinhar por 3 horas. Sirva com arroz, couve, farofa e laranja.",
        imageUrl: "https://acarnequeomundoprefere.com.br/uploads/media/image/frimesa-receitas-eisbein-1.jpg",
      },
    }),
    prisma.recipe.create({
      data: {
        name: "Caipirinha",
        category: "Bebidas",
        time: 5,
        cuisine: "Brasileira",
        servings: 1,
        rating: 4.8,
        description: "A clássica bebida brasileira feita com cachaça, limão e açúcar.",
        ingredients: "1 limão, 2 colheres de sopa de açúcar, 50ml de cachaça, gelo a gosto",
        instructions: "Corte o limão em pedaços, macere com açúcar, adicione a cachaça e misture bem. Complete com gelo e sirva.",
        imageUrl: "https://assets.epicurious.com/photos/579a2d8e437fcffe02f7230b/master/pass/caipirinha-072816.jpg",
      },
    }),
    prisma.recipe.create({
      data: {
        name: "Brigadeiro",
        category: "Sobremesa",
        time: 20,
        cuisine: "Brasileira",
        servings: 20,
        rating: 5.0,
        description: "O doce mais amado do Brasil, perfeito para festas e celebrações.",
        ingredients: "1 lata de leite condensado, 3 colheres de sopa de chocolate em pó, 1 colher de sopa de manteiga, chocolate granulado para cobrir",
        instructions: "Em uma panela, misture o leite condensado, chocolate em pó e manteiga. Cozinhe em fogo baixo mexendo sempre até desgrudar do fundo. Deixe esfriar, faça bolinhas e passe no granulado.",
        imageUrl: "https://www.sabornamesa.com.br/media/k2/items/cache/5003d452a8da016f3ed02a6385cf54e8_XL.jpg",
      },
    }),
    prisma.recipe.create({
      data: {
        name: "Moqueca de Peixe",
        category: "Prato Principal",
        time: 60,
        cuisine: "Brasileira",
        servings: 6,
        rating: 4.8,
        description: "Prato típico capixaba com peixe fresco, tomates, pimentões e leite de coco.",
        ingredients: "1kg de peixe (badejo ou robalo), 3 tomates, 2 pimentões, 1 cebola, 200ml de leite de coco, azeite de dendê, coentro, sal e pimenta",
        instructions: "Tempere o peixe com sal, limão e alho. Em uma panela de barro, faça camadas de cebola, tomate, pimentão e peixe. Adicione leite de coco e dendê. Cozinhe por 40 minutos em fogo baixo. Finalize com coentro.",
        imageUrl: "https://static.itdg.com.br/images/1200-630/8b4e7db912959c6b4bcae7c58375f4b6/moqueca-de-peixe-e-camarao.jpg",
      },
    }),
  ]);

  // Receitas Italianas
  const receitasItalianas = await Promise.all([
    prisma.recipe.create({
      data: {
        name: "Lasanha à Bolonhesa",
        category: "Prato Principal",
        time: 90,
        cuisine: "Italiana",
        servings: 8,
        rating: 4.9,
        description: "Camadas deliciosas de massa, molho bolonhesa e molho branco gratinadas no forno.",
        ingredients: "500g de massa para lasanha, 800g de carne moída, 2 latas de tomate pelado, 500ml de leite, 50g de manteiga, 50g de farinha de trigo, queijo parmesão, mussarela, alho, cebola, sal e pimenta",
        instructions: "Prepare o molho bolonhesa refogando carne com alho, cebola e tomate. Faça o molho branco com manteiga, farinha e leite. Monte camadas alternando massa, molho bolonhesa, molho branco e queijo. Asse por 40 minutos a 180°C.",
        imageUrl: "https://static.itdg.com.br/images/360-240/ec2a5e38702c60bf1ace0b5f1c8e9415/shutterstock-739787011.jpg",
      },
    }),
    prisma.recipe.create({
      data: {
        name: "Aperol Spritz",
        category: "Bebidas",
        time: 5,
        cuisine: "Italiana",
        servings: 1,
        rating: 4.7,
        description: "Drink refrescante italiano feito com Aperol, espumante e água com gás.",
        ingredients: "90ml de espumante, 60ml de Aperol, 30ml de água com gás, fatia de laranja, gelo",
        instructions: "Encha uma taça com gelo, adicione o espumante, o Aperol e a água com gás. Misture suavemente e decore com uma fatia de laranja.",
        imageUrl: "https://www.thebottleclub.com/cdn/shop/articles/TBC_recipe_image_5_e868e523-5fd8-4610-b111-d25510514cff-307537.jpg?v=1707230717",
      },
    }),
    prisma.recipe.create({
      data: {
        name: "Risoto de Funghi",
        category: "Prato Principal",
        time: 45,
        cuisine: "Italiana",
        servings: 4,
        rating: 4.7,
        description: "Arroz cremoso com cogumelos variados e parmesão.",
        ingredients: "300g de arroz arbóreo, 200g de cogumelos variados, 1 litro de caldo de legumes, 1 cebola, 100ml de vinho branco, 50g de manteiga, queijo parmesão ralado, azeite, sal e pimenta",
        instructions: "Refogue a cebola, adicione o arroz e o vinho. Vá adicionando o caldo aos poucos mexendo sempre. Adicione os cogumelos salteados. Finalize com manteiga e parmesão.",
        imageUrl: "https://i.panelinha.com.br/i1/bk-8187-risoto.webp",
      },
    }),
    prisma.recipe.create({
      data: {
        name: "Tiramisu",
        category: "Sobremesa",
        time: 30,
        cuisine: "Italiana",
        servings: 8,
        rating: 4.9,
        description: "Sobremesa italiana clássica com café, mascarpone e biscoitos champanhe.",
        ingredients: "500g de mascarpone, 6 ovos, 200g de açúcar, 300ml de café forte, 2 pacotes de biscoito champanhe, cacau em pó, 50ml de licor de café",
        instructions: "Separe as claras das gemas. Bata as gemas com açúcar até ficar cremoso, adicione o mascarpone. Bata as claras em neve e incorpore delicadamente. Molhe os biscoitos no café e monte camadas alternadas com o creme. Polvilhe cacau e leve à geladeira por 4 horas.",
        imageUrl: "https://www.estadao.com.br/resizer/v2/Q3SE72ZUZRGKHOJHHW33TBLP4A.jpg?quality=80&auth=99e0932596dfb11072a492b535e5440a1606f799119ab742cb1466cbc772ad8a&width=1200",
      },
    }),
  ]);

  // Receitas Japonesas
  const receitasJaponesas = await Promise.all([
    prisma.recipe.create({
      data: {
        name: "Sushi Variado",
        category: "Prato Principal",
        time: 60,
        cuisine: "Japonesa",
        servings: 4,
        rating: 4.8,
        description: "Combinado de sushis com salmão, atum e pepino.",
        ingredients: "400g de arroz japonês, 300g de salmão fresco, 200g de atum, 6 folhas de alga nori, 1 pepino japonês, vinagre de arroz, açúcar, sal, wasabi, shoyu",
        instructions: "Cozinhe o arroz e tempere com vinagre de arroz. Corte os peixes em tiras. Coloque a alga na esteira, espalhe o arroz, adicione os recheios e enrole. Corte em pedaços e sirva com wasabi e shoyu.",
        imageUrl: "https://www.shutterstock.com/image-photo/assorted-sushi-arranged-on-slate-600nw-2656111179.jpg",
      },
    }),
    prisma.recipe.create({
      data: {
        name: "Ramen Tradicional",
        category: "Prato Principal",
        time: 120,
        cuisine: "Japonesa",
        servings: 4,
        rating: 4.7,
        description: "Sopa japonesa com macarrão, caldo rico e diversos acompanhamentos.",
        ingredients: "400g de macarrão ramen, 1,5L de caldo de ossos, 4 ovos, 300g de chashu (barriga de porco), alga nori, cebolinha, brotos de feijão, óleo de gergelim, shoyu, missô",
        instructions: "Prepare o caldo cozinhando ossos por 2 horas. Cozinhe o macarrão. Prepare o chashu assado. Cozinhe os ovos por 7 minutos. Monte tigelas com macarrão, caldo quente e acompanhamentos.",
        imageUrl: "https://nsc-total-wp.s3.sa-east-1.amazonaws.com/wp-content/uploads/legacy/s3fs-public/graphql-upload-files/Lamen%20ramen%20%20Jcomp%20Freepik_0.jpg",
      },
    }),
    prisma.recipe.create({
      data: {
        name: "Tempurá de Legumes",
        category: "Entrada",
        time: 30,
        cuisine: "Japonesa",
        servings: 4,
        rating: 4.6,
        description: "Legumes empanados em massa leve e crocante.",
        ingredients: "200g de farinha de trigo, 1 ovo, 250ml de água gelada, batata-doce, berinjela, abobrinha, cenoura, óleo para fritar, sal",
        instructions: "Corte os legumes em fatias finas. Prepare a massa misturando farinha, ovo e água gelada levemente (pode ficar com grumos). Aqueça o óleo a 180°C. Passe os legumes na massa e frite até dourar. Escorra em papel absorvente.",
        imageUrl: "https://images.aws.nestle.recipes/original/bdf29885bad53e2cb1c6aa4c5e029c08_tempura-legumes-receitas-nestle.jpeg",
      },
    }),
  ]);

  // Receitas Mexicanas
  const receitasMexicanas = await Promise.all([
    prisma.recipe.create({
      data: {
        name: "Tacos al Pastor",
        category: "Prato Principal",
        time: 50,
        cuisine: "Mexicana",
        servings: 6,
        rating: 4.9,
        description: "Tacos tradicionais mexicanos com carne de porco marinada e abacaxi.",
        ingredients: "600g de lombo de porco, tortillas de milho, 1 abacaxi, cebola roxa, coentro, limão, pimenta chipotle, cominho, alho, vinagre, sal",
        instructions: "Marine a carne com especiarias por 2 horas. Grelhe a carne e o abacaxi. Corte em cubos pequenos. Aqueça as tortillas. Monte os tacos com carne, abacaxi, cebola e coentro. Sirva com limão.",
        imageUrl: "https://iamafoodblog.b-cdn.net/wp-content/uploads/2021/05/al-pastor-3507w.jpg",
      },
    }),
    prisma.recipe.create({
      data: {
        name: "Margarita",
        category: "Bebidas",
        time: 5,
        cuisine: "Mexicana",
        servings: 1,
        rating: 4.9,
        description: "Tradicional drink mexicano à base de tequila, licor de laranja e suco de limão.",
        ingredients: "50ml de tequila, 25ml de licor de laranja, 25ml de suco de limão, sal para a borda, gelo",
        instructions: "Passe limão na borda do copo e mergulhe no sal. Bata os ingredientes com gelo e sirva coado no copo preparado.",
        imageUrl: "https://cdn.casaeculinaria.com/wp-content/uploads/2023/11/17152100/margarita.webp",
      },
    }),
    prisma.recipe.create({
      data: {
        name: "Guacamole Tradicional",
        category: "Entrada",
        time: 15,
        cuisine: "Mexicana",
        servings: 6,
        rating: 4.8,
        description: "Pasta cremosa de abacate com tomate, cebola e temperos.",
        ingredients: "3 abacates maduros, 2 tomates, 1 cebola roxa, 1 jalapeño, coentro fresco, suco de 2 limões, sal",
        instructions: "Amasse os abacates com um garfo. Pique finamente tomate, cebola, jalapeño e coentro. Misture tudo, adicione limão e sal a gosto. Sirva imediatamente com nachos.",
        imageUrl: "https://www.receitasnestle.com.br/sites/default/files/srh_recipes/30d4c4a9b7497ecb6f382f3cccebbb09.jpg",
      },
    }),
  ]);

  // Receitas Francesas
  const receitasFrancesas = await Promise.all([
    prisma.recipe.create({
      data: {
        name: "Coq au Vin",
        category: "Prato Principal",
        time: 120,
        cuisine: "Francesa",
        servings: 6,
        rating: 4.8,
        description: "Frango cozido lentamente em vinho tinto com cogumelos e bacon.",
        ingredients: "1 frango inteiro cortado, 750ml de vinho tinto, 200g de bacon, 300g de cogumelos, 12 cebolas pequenas, 3 dentes de alho, tomilho, louro, farinha, manteiga, sal e pimenta",
        instructions: "Doure o bacon e reserve. Doure o frango na mesma panela. Adicione vinho, alho, ervas e deixe cozinhar por 1 hora. Adicione cogumelos e cebolas. Cozinhe mais 30 minutos. Engrosse o molho se necessário.",
        imageUrl: "https://www.seara.com.br/wp-content/uploads/2025/09/r0625-coq-au-vin-1200x675-1.webp",
      },
    }),
    prisma.recipe.create({
      data: {
        name: "Kir Royale",
        category: "Bebidas",
        time: 3,
        cuisine: "Francesa",
        servings: 1,
        rating: 4.6,
        description: "Elegante drink francês feito com licor de cassis e champanhe.",
        ingredients: "10ml de licor de cassis, 90ml de champanhe gelado",
        instructions: "Coloque o licor de cassis em uma taça e complete delicadamente com o champanhe gelado.",
        imageUrl: "https://storage.googleapis.com/imagens_videos_gou_cooking_prod/production/mesas/2019/10/83f254ec-kir-royale-_-tm-drinks-_-vale%CC%81ria-arau%CC%81jo-_-6578-baixa-1-1.jpg",
      },
    }),
    prisma.recipe.create({
      data: {
        name: "Crème Brûlée",
        category: "Sobremesa",
        time: 60,
        cuisine: "Francesa",
        servings: 6,
        rating: 4.9,
        description: "Sobremesa francesa clássica com creme de baunilha e cobertura caramelizada.",
        ingredients: "500ml de creme de leite fresco, 6 gemas, 100g de açúcar, 1 fava de baunilha, açúcar demerara para caramelizar",
        instructions: "Aqueça o creme com a baunilha. Bata gemas com açúcar. Misture com o creme quente. Distribua em ramequins. Asse em banho-maria por 40 minutos a 150°C. Deixe esfriar. Polvilhe açúcar e caramelize com maçarico.",
        imageUrl: "https://mychefrecipe.com/wp-content/uploads/2021/06/creme-brulee-14.jpg",
      },
    }),
  ]);

  // Receitas Chinesas
  const receitasChinesas = await Promise.all([
    prisma.recipe.create({
      data: {
        name: "Frango Xadrez",
        category: "Prato Principal",
        time: 35,
        cuisine: "Chinesa",
        servings: 4,
        rating: 4.7,
        description: "Frango em cubos salteado com vegetais e amendoim.",
        ingredients: "500g de peito de frango, 100g de amendoim torrado, 1 pimentão vermelho, 1 pimentão verde, molho shoyu, amido de milho, gengibre, alho, cebola, óleo de gergelim, açúcar",
        instructions: "Corte o frango em cubos e marine com shoyu e amido. Saltei o frango em fogo alto. Adicione vegetais picados. Tempere com molho de shoyu, gengibre e alho. Finalize com amendoim e óleo de gergelim.",
        imageUrl: "https://www.seara.com.br/wp-content/uploads/2025/09/frango-xadrez-01.jpg",
      },
    }),
    prisma.recipe.create({
      data: {
        name: "Yakisoba",
        category: "Prato Principal",
        time: 40,
        cuisine: "Chinesa",
        servings: 4,
        rating: 4.8,
        description: "Macarrão frito com legumes e carne ao estilo oriental.",
        ingredients: "400g de macarrão para yakisoba, 300g de carne (frango, porco ou boi), repolho, cenoura, brócolis, molho shoyu, molho inglês, óleo de gergelim, alho, gengibre",
        instructions: "Cozinhe o macarrão e reserve. Saltei a carne em fogo alto. Adicione os legumes. Adicione o macarrão e os molhos. Mexa rapidamente em fogo alto por 3 minutos.",
        imageUrl: "https://acarnequeomundoprefere.com.br/uploads/media/image/frimesa-receitas-yakisoba-de-coxao-mole-3.jpg",
      },
    }),
  ]);

  // Receitas Indianas
  const receitasIndianas = await Promise.all([
    prisma.recipe.create({
      data: {
        name: "Frango Tikka Masala",
        category: "Prato Principal",
        time: 60,
        cuisine: "Indiana",
        servings: 6,
        rating: 4.9,
        description: "Frango marinado em iogurte e especiarias, cozido em molho cremoso de tomate e curry.",
        ingredients: "600g de peito de frango, 200g de iogurte natural, 2 colheres de sopa de curry, 1 colher de chá de garam masala, 1 cebola, 2 dentes de alho, 400g de tomate pelado, 200ml de creme de leite, sal e coentro",
        instructions: "Marine o frango no iogurte e especiarias por 2 horas. Grelhe o frango. Refogue cebola e alho, adicione o tomate e cozinhe. Misture o frango e o creme. Cozinhe por 10 minutos e finalize com coentro.",
        imageUrl: "https://www.seara.com.br/wp-content/uploads/2025/09/Frango-ao-molho-tikka-masala.jpg",
      },
    }),
    prisma.recipe.create({
      data: {
        name: "Samosa Tradicional",
        category: "Entrada",
        time: 45,
        cuisine: "Indiana",
        servings: 10,
        rating: 4.7,
        description: "Pastéis indianos recheados com batata e ervilhas, fritos até ficarem dourados.",
        ingredients: "300g de farinha de trigo, 3 batatas, 100g de ervilhas, 1 cebola, 1 colher de chá de curry, óleo para fritar, sal e pimenta",
        instructions: "Prepare a massa com farinha, água e sal. Cozinhe batatas e ervilhas com especiarias. Recheie a massa e feche em formato triangular. Frite até dourar.",
        imageUrl: "https://thumbs.dreamstime.com/b/samosa-samsa-prato-tradicional-nacional-do-uzbequist%C3%A3o-no-cazaquist%C3%A3o-tajikist%C3%A3o-e-cozinha-da-%C3%A1sia-186062191.jpg",
      },
    }),
  ]);

  // Receitas Alemãs
  const receitasAlemas = await Promise.all([
    prisma.recipe.create({
      data: {
        name: "Schnitzel",
        category: "Prato Principal",
        time: 40,
        cuisine: "Alemã",
        servings: 4,
        rating: 4.8,
        description: "Bife empanado e frito, crocante por fora e suculento por dentro.",
        ingredients: "4 bifes de porco, 2 ovos, farinha de trigo, farinha de rosca, sal, pimenta, limão e óleo para fritar",
        instructions: "Tempere os bifes com sal e pimenta. Passe na farinha, depois no ovo e por último na farinha de rosca. Frite até dourar. Sirva com limão e batatas.",
        imageUrl: "https://static.itdg.com.br/images/1200-630/900d166ebda000c6e577d14fe4b14fcb/schnitzel.jpg",
      },
    }),
    prisma.recipe.create({
      data: {
        name: "Apfelstrudel",
        category: "Sobremesa",
        time: 90,
        cuisine: "Alemã",
        servings: 8,
        rating: 4.9,
        description: "Clássico strudel de maçã com canela e passas.",
        ingredients: "6 maçãs, 100g de açúcar, 1 colher de chá de canela, 50g de passas, 1 massa folhada, 50g de manteiga, açúcar de confeiteiro",
        instructions: "Descasque e fatie as maçãs. Misture com açúcar, canela e passas. Recheie a massa folhada, enrole e pincele manteiga. Asse a 180°C por 40 minutos e polvilhe açúcar de confeiteiro.",
        imageUrl: "https://i0.wp.com/guiadoestrangeiro.com/wp-content/uploads/2022/09/Apfelstrudel.jpg?fit=585%2C351&ssl=1",
      },
    }),
  ]);

  // Receitas Tailandesas
  const receitasTailandesas = await Promise.all([
    prisma.recipe.create({
      data: {
        name: "Pad Thai",
        category: "Prato Principal",
        time: 30,
        cuisine: "Tailandesa",
        servings: 4,
        rating: 4.8,
        description: "Macarrão de arroz salteado com camarões, amendoim e molho agridoce.",
        ingredients: "300g de macarrão de arroz, 200g de camarões, 2 ovos, 100g de broto de feijão, 50g de amendoim torrado, 3 colheres de molho de peixe, 1 colher de açúcar, 1 limão, óleo e cebolinha",
        instructions: "Cozinhe o macarrão e reserve. Salteie camarões, adicione ovos mexidos, molho e açúcar. Junte o macarrão e o broto de feijão. Sirva com amendoim e limão.",
        imageUrl: "https://s2.glbimg.com/sJdm9NnXnKlG8CQOQSr9ECbSGXA=/smart/e.glbimg.com/og/ed/f/original/2018/09/26/receita-pad-thai.jpg",
      },
    }),
    prisma.recipe.create({
      data: {
        name: "Curry Verde Tailandês",
        category: "Prato Principal",
        time: 45,
        cuisine: "Tailandesa",
        servings: 4,
        rating: 4.7,
        description: "Curry tailandês picante com frango e leite de coco.",
        ingredients: "400g de peito de frango, 400ml de leite de coco, 2 colheres de pasta de curry verde, 1 pimentão, 1 berinjela, folhas de manjericão, óleo e sal",
        instructions: "Refogue a pasta de curry no óleo. Adicione o frango e refogue. Acrescente o leite de coco e os legumes. Cozinhe até engrossar. Finalize com manjericão.",
        imageUrl: "https://jujunatrip.com/wp-content/uploads/2020/05/receita-curry-1050x700.jpg",
      },
    }),
  ]);

  // Receitas Árabes
  const receitasArabes = await Promise.all([
    prisma.recipe.create({
      data: {
        name: "Kibe Frito",
        category: "Prato Principal",
        time: 60,
        cuisine: "Árabe",
        servings: 10,
        rating: 4.8,
        description: "Bolinho de trigo e carne moída temperado com hortelã e cebola.",
        ingredients: "500g de carne moída, 300g de trigo para kibe, 1 cebola, hortelã, sal, pimenta síria e óleo para fritar",
        instructions: "Deixe o trigo de molho por 30 minutos. Misture com carne e temperos. Modele e frite até dourar.",
        imageUrl: "https://receitasdeminuto.com/wp-content/uploads/2018/02/como_fazer_kibe_frito_facil2.jpg",
      },
    }),
    prisma.recipe.create({
      data: {
        name: "Limonada com Hortelã",
        category: "Bebidas",
        time: 10,
        cuisine: "Árabe",
        servings: 2,
        rating: 4.8,
        description: "Bebida tradicional árabe refrescante feita com limão, hortelã e gelo.",
        ingredients: "3 limões, 1 punhado de folhas de hortelã, 3 colheres de sopa de açúcar, 500ml de água gelada, gelo",
        instructions: "Bata todos os ingredientes no liquidificador até ficar homogêneo. Coe se desejar e sirva bem gelado.",
        imageUrl: "https://i0.wp.com/pat.feldman.com.br/wp-content/uploads/2009/11/Screen-shot-2011-03-08-at-8.46.12-PM.png?fit=529%2C359&ssl=1",
      },
    }),
    prisma.recipe.create({
      data: {
        name: "Homus",
        category: "Entrada",
        time: 15,
        cuisine: "Árabe",
        servings: 6,
        rating: 4.9,
        description: "Pasta cremosa de grão-de-bico com tahine e limão.",
        ingredients: "2 xícaras de grão-de-bico cozido, 2 colheres de tahine, suco de 1 limão, 2 dentes de alho, azeite, sal e cominho",
        instructions: "Bata todos os ingredientes no processador até formar uma pasta lisa. Regue com azeite e sirva com pão sírio.",
        imageUrl: "https://blog.biglar.com.br/wp-content/uploads/2021/05/iStock-955998652.jpg",
      },
    }),
  ]);

  // Receitas Espanholas
  const receitasEspanholas = await Promise.all([
    prisma.recipe.create({
      data: {
        name: "Paella Valenciana",
        category: "Prato Principal",
        time: 75,
        cuisine: "Espanhola",
        servings: 6,
        rating: 4.9,
        description: "Arroz espanhol com frutos do mar, frango e açafrão.",
        ingredients: "500g de arroz, 300g de frango, 200g de camarões, 150g de lula, 1 pimentão, 1 tomate, açafrão, caldo de frango, azeite, alho, sal e pimenta",
        instructions: "Refogue o frango e os frutos do mar. Adicione o arroz, o açafrão e o caldo. Cozinhe até o arroz ficar macio e o líquido reduzir. Sirva decorado com pimentão.",
        imageUrl: "https://www.rampinelli.com.br//uploads/receita/receita-paella-valenciana-1679600080.jpg?w=800&h=700",
      },
    }),
    prisma.recipe.create({
      data: {
        name: "Churros com Chocolate",
        category: "Sobremesa",
        time: 30,
        cuisine: "Espanhola",
        servings: 8,
        rating: 4.8,
        description: "Massa frita polvilhada com açúcar e canela, servida com chocolate quente.",
        ingredients: "250ml de água, 2 colheres de manteiga, 200g de farinha, 2 ovos, açúcar, canela, óleo para fritar e chocolate derretido",
        instructions: "Ferva a água com manteiga, adicione a farinha e misture. Acrescente os ovos. Modele e frite até dourar. Polvilhe açúcar e canela. Sirva com chocolate.",
        imageUrl: "https://cms-bomgourmet.s3.amazonaws.com/bomgourmet%2F2023%2F04%2F30104625%2Fchurros-de-chocolate-foto.jpg",
      },
    }),
  ]);

  const totalReceitas = await prisma.recipe.count();
  console.log(`Seed concluído! ${totalReceitas} receitas inseridas com sucesso.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
