import CategoryRepository from "../repositories/CategoryRepository.js";
import { ApiError } from "../middlewares/error.middleware.js";

class CategoryService {
    async getAllCategory() {
        const categories = await CategoryRepository.findAll();
        return categories.map(category => category.toJSON());
    }

    async getCategoryById(id) {
        const category = await CategoryRepository.findById(id);
        if (!category) {
            throw ApiError.notFound('Category not found', 'CATEGORY_NOT_FOUND');
        }
        return category.toJSON();
    }

    async createCategory(categoryData) {
        const category = await CategoryRepository.create(categoryData);
        return category.toJSON();
    }

    async updateCategory(id, categoryData) {
        const category = await CategoryRepository.update(id, categoryData);
        return category.toJSON();
    }

    async deleteCategory(id) {
        const category = await CategoryRepository.delete(id);
        return category.toJSON();
    }

}

export default new CategoryService();