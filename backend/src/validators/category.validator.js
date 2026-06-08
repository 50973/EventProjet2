import Joi from 'joi';

export const createCategorySchema = {
  body: Joi.object({
    name: Joi.string()
      .min(2)
      .max(100)
        .required()
        .messages({
            'string.min': 'Name must be at least 2 characters',
            'string.max': 'Name must be at most 100 characters',
            'any.required': 'Name is required'
        })
    })
};

export const updateCategorySchema = {
  body: Joi.object({
    name: Joi.string()
      .min(2)
      .max(100)
      .messages({
        'string.min': 'Name must be at least 2 characters',
        'string.max': 'Name must be at most 100 characters'
      })
  })
};

export const getCategorySchema = {
  params: Joi.object({
    id: Joi.string()
      .uuid()
      .required()
  })
};

export const deleteCategorySchema = {
  params: Joi.object({
    id: Joi.string()
      .uuid()
      .required()
  })
};

export default {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
  deleteCategorySchema
};