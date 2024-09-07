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
    // Fetch a single product by ID
    product: async (_, { id }) => {
      const product = await Product.findByPk(id, {
        include: [{ model: Category, as: 'categories' }],
      });
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
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
    // Edit an existing product
    editProduct: async (_, { id, title, description, price, categoryIds }) => {
      const product = await Product.findByPk(id);
      if (!product) {
        throw new Error('Product not found');
      }

      // Update product fields if provided
      if (title !== undefined) product.title = title;
      if (description !== undefined) product.description = description;
      if (price !== undefined) product.price = price;

      await product.save();

      if (categoryIds) {
        // Update categories associations
        const categories = await Category.findAll({ where: { id: categoryIds } });
        await product.setCategories(categories);
      }

      return product;
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
