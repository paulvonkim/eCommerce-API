import { Router } from "express";
import { productValidate } from "../middleware/productMiddleware.js";
import { getProducts,
          getProductById,
          createProduct,
          updateProduct,
          deleteProduct
 } from "../controllers/products.js";

const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);
productRouter.post("/", productValidate, createProduct);
productRouter.put("/:id", productValidate, updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;