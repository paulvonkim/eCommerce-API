import Joi from "joi";

export const userSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/)
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.pattern.base": "Name must contain only letters and spaces.",
    }),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string()
    .pattern(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]{8,30}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Password must be 8-30 characters long, contain at least one uppercase letter and one digit.",
    }),
});

export const userUpdateSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/)
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.pattern.base": "Name must contain only letters and spaces.",
    }),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

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

