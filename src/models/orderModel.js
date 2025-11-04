import prisma from "../../prisma/prisma.js";

class RecipeModel {
  // Obter todas as receitas 
  async findAll() {
    const recipes = await prisma.recipe.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    return recipes;
  }

  // Obter uma receita pelo ID
  async findById(id) {
    const recipe = await prisma.recipe.findUnique({
      where: {
        id: Number(id),
      },
    });

    return recipe;
  }

  // Criar uma nova receita
  async create(name, category, time, cuisine, servings, rating, description, ingredients, instructions, imageUrl) {
    const newRecipe = await prisma.recipe.create({
      data: {
        name, 
        category, 
        time, 
        cuisine, 
        servings, 
        rating, 
        description, 
        ingredients, 
        instructions, 
        imageUrl
      },
    });

    return newRecipe;
  }

  // Atualizar uma receita
  async update(id, name, category, time, cuisine, servings, rating, description, ingredients, instructions, imageUrl) {
    const recipe = await this.findById(id);

    if (!recipe) {
      return null;
    }

    // Atualiza apenas os campos que foram enviados
    const data = {};
    if (name !== undefined) data.name = name;
    if (category !== undefined) data.category = category;
    if (time !== undefined) data.time = time;
    if (cuisine !== undefined) data.cuisine = cuisine;
    if (servings !== undefined) data.servings = servings;
    if (rating !== undefined) data.rating = rating;
    if (description !== undefined) data.description = description;
    if (ingredients !== undefined) data.ingredients = ingredients;
    if (instructions !== undefined) data.instructions = instructions;
    if (imageUrl !== undefined) data.imageUrl = imageUrl;

    const recipeUpdated = await prisma.recipe.update({
      where: {
        id: Number(id),
      },
      data,
    });

    return recipeUpdated;
  }

  // Remover uma receita
  async delete(id) {
    const recipe = await this.findById(id);

    if (!recipe) {
      return null;
    }

    await prisma.recipe.delete({
      where: {
        id: Number(id),
      },
    });

    return true;
  }
}

export default new RecipeModel();
