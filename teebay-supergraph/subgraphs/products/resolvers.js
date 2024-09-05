// products/resolvers.js
import models from '../../../models/index.js';  // Import User model to check user existence
const { Product, Category, User } = models;

const resolvers = {
  Query: {
    // Fetch products, optionally filtering by userId
    products: async (_, { userId }) => {
      const whereClause = userId ? { userId } : {};  // Filter by userId if provided
      const products = await Product.findAll({
        where: whereClause,
        include: [{ model: Category, as: 'categories' }],  // Include related categories
      });
      return products.map(product => ({
        ...product.toJSON(),
        categories: product.categories || [],  // Return an empty array if categories is null
      }));
    },
    // Fetch all categories
    categories: async () => await Category.findAll(),
  },
  Mutation: {
    // Add a new product
    addProduct: async (_, { title, description, price, userId, categoryIds }) => {
      // Check if user exists
      const userExists = await User.findByPk(userId);
      if (!userExists) {
        throw new Error('User not found');
      }

      // Create a new product with category IDs
      const newProduct = await Product.create({
        title,
        description,
        price,
        userId,
        categoryIds,
      });

      return newProduct;
    },
  },
  Product: {
    // Resolver for fetching associated categories of a product
    categories: async (product) => {
      return await Category.findAll({
        where: {
          id: product.categoryIds,
        },
      });
    },
  },
};

export default resolvers;
