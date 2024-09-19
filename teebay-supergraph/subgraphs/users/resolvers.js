// users/resolvers.js

import models from '../../../models/index.js';
const { User } = models;  

// Resolvers for handling GraphQL operations
const resolvers = {
  Query: {
    // Fetch all users
    users: async () => await User.findAll(),
    
    // Fetch a single user by ID
    user: async (_, { id }) => await User.findByPk(id),

     // Fetch user by ID for the getUser query
     getUser: async (_, { id }) => {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error('User not found');
      }
      
      // Return the user fields as defined in the query
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        address: user.address,
        phoneNumber: user.phoneNumber,
      };
    }, 
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
      const validPassword = password === user.password;
      if (!validPassword) {
        throw new Error('Invalid password');
      }
      
      return user;
    },
  },
};

export default resolvers;
