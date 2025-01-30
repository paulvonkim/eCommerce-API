import { orderSchema } from "../schemas/orderSchemas.js";

export const orderValidate = (req, res, next) => {
  const { error } = orderSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({ 
      errors: error.details.map((err) => err.message)
    });
  }

  next();
};
