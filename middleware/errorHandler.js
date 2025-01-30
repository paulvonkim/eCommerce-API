class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorHandler = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(400).json({
      type: "ValidationError",
      message: err.message,
      details: err.details,
    });
  }

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      type: "ApiError",
      message: err.message,
    });
  }

  console.error(err.stack);
  res.status(500).json({
    type: "ServerError",
    message: "Internal Server Error",
  });
};

const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(new ApiError(400, error.details[0].message));
    }
    next();
  };
};

export { ApiError, errorHandler, validateBody };
