import { categoryService, subcategoryService } from '../services';

export class AdminController {
  constructor(private categoryService, private subcategoryService) {}

  createCategory = async (req, res, next) => {
    const { title } = req.body;
    await this.categoryService.createCategory({ title });
    return res.sendStatus(201);
  };

  createSubcategory = async (req, res, next) => {
    const { categoryId, subcategory } = req.body;
    await this.subcategoryService.createSubcategory(categoryId, subcategory);
    return res.sendStatus(201);
  };
}

const adminController = new AdminController(
  categoryService,
  subcategoryService,
);

export { adminController };
