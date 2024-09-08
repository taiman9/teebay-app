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

    // New resolver to fetch all products not owned by the given userId
    browseProducts: async (_, { userId }) => {
      try {
        // Fetch products where userId is not equal to the given userId
        const products = await Product.findAll({
          where: {
            userId: { [models.Sequelize.Op.ne]: userId }  // Using Sequelize.Op.ne for "not equal" condition
          },
          include: [{ model: Category, as: 'categories' }],
        });

        // Return an empty array if no products are found instead of null
        if (!products) {
          return [];
        }

        // Map the products and include the associated categories
        return products.map(product => ({
          ...product.toJSON(),
          categories: product.categories || [],
        }));
      } catch (error) {
        console.error('Error fetching products:', error);
        return [];  // Return an empty array in case of an error
      }
    },
  },

  Mutation: {
    // Add a new product
    addProduct: async (_, { title, description, price, rentPrice, userId, categoryIds }) => {
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
        rentPrice: rentPrice || null,  // Allow null for rentPrice
        userId,
        categoryIds,
      });

      return newProduct;
    },
    // Edit an existing product
    editProduct: async (_, { id, title, description, price, rentPrice, categoryIds }) => {
      const product = await Product.findByPk(id);
      if (!product) {
        throw new Error('Product not found');
      }

      // Update product fields if provided
      if (title !== undefined) product.title = title;
      if (description !== undefined) product.description = description;
      if (price !== undefined) product.price = price;
      if (rentPrice !== undefined) product.rentPrice = rentPrice;  // Allow updating to null

      // Update categoryIds directly in the product model
      if (categoryIds) {
        console.log('Category IDs to be updated:', categoryIds);
        product.categoryIds = categoryIds;  // Update the categoryIds field
      } else {
        throw new Error('Category Ids not found');
      }

      await product.save();

      if (categoryIds) {
        // Update categories associations
        const categories = await Category.findAll({ where: { id: categoryIds } });
        await product.setCategories(categories);
      }

      return product;
    },
    
   // Delete an existing product
   deleteProduct: async (_, { id }) => {
    try {
      const product = await Product.findByPk(id);  // Find the product by ID
      if (!product) {
        console.error(`Product with ID ${id} not found.`);
        return false;  // Return false if the product does not exist
      }

      // Ensure product's userId references a valid user
      const userExists = await User.findByPk(product.userId);
      if (!userExists) {
        console.error(`User with ID ${product.userId} not found.`);
        return false;  // Return false if the user does not exist
      }

      // Remove associations with categories before deletion
      await product.setCategories([]);  // Clear associated categories

      // Delete product directly by ID
      await Product.destroy({
        where: {
          id: id,  // Use the product ID to specify which product to delete
        },
      });

      console.log(`Product with ID ${id} successfully deleted.`);
      return true;  // Return true if the deletion was successful
    } catch (error) {
      console.error('Error deleting product:', error);
      return false;  // Return false if an error occurred
      }
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
