import { productSchema } from "../schemas/productSchemas.js";

export const productValidate = (req, res, next) => {
  const { error } = productSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({ 
      errors: error.details.map((err) => err.message)
    });
  }

  next();
};