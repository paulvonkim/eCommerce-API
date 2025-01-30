const validateSchema = (schema) => {
    return (req, res, next) => {
      try {
        schema(req.body);
        next();
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    };
  };
  
  export default validateSchema;