import { Router } from "express";
import CategoryController from "../controllers/categories.js";

const categoryRouter = Router();

categoryRouter.get("/", CategoryController.getCategories);
categoryRouter.get("/:id", CategoryController.getCategory);
categoryRouter.post("/", CategoryController.createCategory);
categoryRouter.put("/:id", CategoryController.updateCategory);
categoryRouter.delete("/:id", CategoryController.deleteCategory);

export default categoryRouter;
