import { Category } from '../models/index.js';

class CategoryRepository {
    async findAll() {
        return await Category.findAll();
    }

    async findById(id) {
        return await Category.findByPk(id);
    }

    async create(categoryData) {
        return await Category.create({
            name: categoryData.name,
            slug: categoryData.slug,
        });
    }

    async update(id, categoryData) {
        const category = await this.findById(id);
        if (!category) {
            throw new Error('Category not found');
        }
        return await category.update(categoryData);
    }

    async delete(id) {
        const category = await this.findById(id);
        if (!category) {
            throw new Error('Category not found');
        }
        return await category.destroy();
    }
}

export default new CategoryRepository();