import Joi from "joi";

export const orderSchema = Joi.object({
  total: Joi.number().required(),
  userId: Joi.number().integer().required()
});

export const orderValidate = (req, res, next) => {
  const { error } = orderSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({ 
      errors: error.details.map((err) => err.message)
    });
  }

  next();
};
