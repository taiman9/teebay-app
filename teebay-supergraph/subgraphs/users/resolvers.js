import models from '../../../models/index.js';
const { User } = models;

// Resolvers for handling GraphQL operations
const resolvers = {
  Query: {
    users: async () => await User.findAll(),
    user: async (_, { id }) => await User.findByPk(id),
  },
  Mutation: {
    // Register a new user
    register: async (_, { email, password, firstName, lastName, address, phoneNumber }) => {
      // Check if the user already exists
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        throw new Error('User already exists');
      }

      // Create a new user and add it to the users array
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password,
        address,
        phoneNumber
      });

      return newUser;
    },

    // Sign in an existing user
    login: async (_, { email, password }) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error('User not found');
      }
      const validpassword = await password === user.password;
      if (!validpassword) {
        throw new Error('Invalid password');
      }
      
      return user;
    },
  },
};

export default resolvers;
