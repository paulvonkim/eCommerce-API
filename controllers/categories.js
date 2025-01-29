import Category from "../models/Category.js";

class CategoryController {
  async getCategories(req, res) {
    try {
      const categories = await Category.findAll();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getCategory(req, res) {
    try {
      const category = await Category.findByPk(req.params.id);
      if (!category)
        return res.status(404).json({ error: "Category not found" });
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createCategory(req, res) {
    try {
      const { name } = req.body;
      if (!name) return res.status(400).json({ error: "Name is required" });
      const category = await Category.create({ name });
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateCategory(req, res) {
    try {
      const { name } = req.body;
      const category = await Category.findByPk(req.params.id);
      if (!category)
        return res.status(404).json({ error: "Category not found" });
      await category.update({ name });
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteCategory(req, res) {
    try {
      const category = await Category.findByPk(req.params.id);
      if (!category)
        return res.status(404).json({ error: "Category not found" });
      await category.destroy();
      res.json({ message: "Category deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new CategoryController();
