import { Router } from "express";
import CategoryController from "../controllers/categories.js";
import { validateBody } from "../middleware/errorHandler.js";
import { categorySchema } from "../schemas/category.schema.js";

const categoryRouter = Router();

categoryRouter.get("/", CategoryController.getCategories);
categoryRouter.get("/:id", CategoryController.getCategory);
categoryRouter.post(
  "/",
  validateBody(categorySchema),
  CategoryController.createCategory
);
categoryRouter.put("/:id", CategoryController.updateCategory);
categoryRouter.delete("/:id", CategoryController.deleteCategory);

export default categoryRouter;
