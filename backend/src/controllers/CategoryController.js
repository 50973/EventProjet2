import CategoryService from "../services/CategoryService.js";

class CategoryController {
  async listCategories(req, res, next) {
    try {
      const categories = await CategoryService.getAllCategory();
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }

  async getCategory(req, res, next) {
    try {
      const category = await CategoryService.getCategoryById(req.params.id);
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }

  async createCategory(req, res, next) {
    try {
      const category = await CategoryService.createCategory(req.body);
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }

  async updateCategory(req, res, next) {
    try {
      const category = await CategoryService.updateCategory(req.params.id, req.body);
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }

  async deleteCategory(req, res, next) {
    try {
      await CategoryService.deleteCategory(req.params.id);
      res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}

export default new CategoryController();