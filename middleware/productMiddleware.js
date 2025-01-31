import { productSchema } from "../schemas/productSchemas.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const productValidate = (req, res, next) => {
  const { error } = productSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return next(new ErrorResponse("Validation Error", 400, error.details.map(err => err.message)));
  }

  next();
};
