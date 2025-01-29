// productSchemas.js

// Create a simple schema validation function for the product fields
const validateProduct = (product) => {
    const { name, description, price, categoryId } = product;
  
    // Validation rules
    if (!name || !description || price === undefined || categoryId === undefined) {
      throw new Error('All fields (name, description, price, categoryId) are required.');
    }
  
    if (price < 0) {
      throw new Error('Price must be a non-negative number.');
    }
  
    if (categoryId < 0) {
      throw new Error('Category ID must be a non-negative integer.');
    }
  };
  
  // Export the validation function for use in your routes
  
export default validateProduct;
  