// src/resolvers.js

const users = [];

// Resolvers for handling GraphQL operations
const resolvers = {
  Query: {
    users: async () => users,
  },
  Mutation: {
    // Register a new user
    register: async (_, { email, password, firstName, lastName, address, phoneNumber }) => {
      // Check if the user already exists
      const existingUser = users.find((user) => user.email === email);
      if (existingUser) {
        throw new Error('User already exists');
      }

      // Create a new user and add it to the users array
      const newUser = {
        id: users.length + 1,
        email,
        password,
        firstName,
        lastName,
        address,
        phoneNumber
      };
      users.push(newUser);
      return newUser;
    },

    // Sign in an existing user
    login: async (_, { email, password }) => {
      const user = users.find((user) => user.email === email && user.password === password);
      if (!user) {
        throw new Error('Invalid email or password');
      }
      return user;
    },
  },
};

export default resolvers;
