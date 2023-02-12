import { CategoryService, SubcategoryService } from '../services';

const createCategory = async (req, res, next) => {
  const { category } = req.body;
  await CategoryService.createCategory({ name: category });
  return res.sendStatus(201);
};

const createSubcategory = async (req, res, next) => {
  const { categoryId, subcategory } = req.body;
  await SubcategoryService.createSubcategory(categoryId, subcategory);
  return res.sendStatus(201);
};

const deleteCategory = async (req, res, next) => {
  const { id } = req.params;
  await CategoryService.findByIdAndDelete(id);
  return res.sendStatus(200);
};

const deleteSubcategory = async (req, res, next) => {
  const { name } = req.params;
  await CategoryService.findByIdAndDelete(id);
  return res.sendStatus(200);
};

export { createCategory, createSubcategory, deleteCategory, deleteSubcategory };
