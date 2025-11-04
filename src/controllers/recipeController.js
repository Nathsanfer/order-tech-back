import RecipeModel from "../models/recipeModel.js";

class RecipeController {
  // GET /api/recipes
  async getAll(req, res) {
    try {
      const recipes = await RecipeModel.findAll();
      const total = recipes.length;
      
      res.json({
        message: `Total de ${total} receita${total !== 1 ? 's' : ''} encontrada${total !== 1 ? 's' : ''}`,
        recipes: recipes
      });
    } catch (error) {
      console.error("Erro ao buscar receitas:", error);
      res.status(500).json({ error: "Erro ao buscar receitas" });
    }
  }
  
  // GET /api/recipes/:id
  async getById(req, res) {
    try {
      const { id } = req.params;

      const recipe = await RecipeModel.findById(id);

      if (!recipe) {
        return res.status(404).json({ error: "Receita não encontrada" });
      }

      res.json(recipe);
    } catch (error) {
      console.error("Erro ao buscar receita:", error);
      res.status(500).json({ error: "Erro ao buscar receita" });
    }
  }

  // POST /api/recipes
  async create(req, res) {
    try {
      const { name, category, time, cuisine, servings, rating, description, ingredients, instructions, imageUrl } = req.body;

      if (!name || !category || !time || !cuisine || !servings || !rating || !description || !ingredients || !instructions || !imageUrl) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
      }

      const newRecipe = await RecipeModel.create(
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
      );

      if (!newRecipe) {
        return res.status(400).json({ error: "Erro ao criar receita" });
      }

      res.status(201).json(newRecipe);
    } catch (error) {
      console.error("Erro ao criar receita:", error);
      res.status(500).json({ error: "Erro ao criar receita" });
    }
  }
  
  // PUT /api/recipes/:id
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, category, time, cuisine, servings, rating, description, ingredients, instructions, imageUrl } = req.body;

      const updatedRecipe = await RecipeModel.update(
        id,
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
      );

      if (!updatedRecipe) {
        return res.status(404).json({ error: "Receita não encontrada" });
      }

      res.json(updatedRecipe);
    } catch (error) {
      console.error("Erro ao atualizar receita:", error);
      res.status(500).json({ error: "Erro ao atualizar receita" });
    }
  }

  // DELETE /api/recipes/:id
  async delete(req, res) {
    try {
      const { id } = req.params;

      const result = await RecipeModel.delete(id);

      if (!result) {
        return res.status(404).json({ error: "Receita não encontrada" });
      }

      res.status(204).end(); // Resposta sem conteúdo
    } catch (error) {
      console.error("Erro ao remover receita:", error);
      res.status(500).json({ error: "Erro ao remover receita" });
    }
  }
}

export default new RecipeController();
