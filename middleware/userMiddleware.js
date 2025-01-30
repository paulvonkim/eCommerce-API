import { userSchema, userUpdateSchema } from "../schemas/userSchemas.js";

export const userValidate = (req, res, next) => {
  let error;

  if (req.method === "POST") {
    ({ error } = userSchema.validate(req.body, { abortEarly: false }));
  } else {    
    ({ error } = userUpdateSchema.validate(req.body, { abortEarly: false }));
  }

  if (error) {
    return res.status(400).json({
      errors: error.details.map((err) => err.message),
    });
  }

  next();
};

