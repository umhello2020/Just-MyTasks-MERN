const { AuthenticationError } = require('apollo-server-express');
const { User, Task } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_51NGbpyFI0y2ABPrPNcScnoEO6SEwUw6KN3TchtfyXCdFxsIJN8jJuLbajPnFOUaz0uyi7cDgFqcnxrFipwGOS6zt00NXgs8Kel');

const resolvers = {
  Query: {
    getTask: async (parent, { taskId }) => {
      return Task.findById(taskId);
    },
    getTasks: async (parent, args, context) => {
      if (context.user) {
        const { username } = context.user;
        const query = username ? { user: username } : {};
        return Task.find(query).populate('user');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
    getMe: async (parent, args, context) => {
      if (context.user) {
        return User.findById(context.user._id).populate('tasks');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    getDonation: async (parent, { _id }, context) => {
      if (context.user) {
        return User.findOne(
          { _id: context.user._id, 'donations._id': _id },
          { 'donations.$': 1 }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },  
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    updateUser: async (parent, { username, email }, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(
          context.user._id,
          { username, email },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    // Server-side mutation resolver
createTask: async (parent, { title, description, completed }, context) => {
  if (context.user) {
    const task = await Task.create({
      title,
      description,
      completed,
      user: context.user._id,
    });

    await User.findOneAndUpdate(
      { _id: context.user._id },
      { $addToSet: { tasks: task._id } }
    );

    return task;
  }

  throw new AuthenticationError('You need to be logged in to create a task');
},
  
    updateTask: async (parent, { taskId, title, description, completed }, context) => {
      if (context.user) {
        const update = { title, description, completed };
        const options = { new: true };

        return Task.findByIdAndUpdate(taskId, update, options);
      }
      throw new AuthenticationError('You need to be logged in to update a task');
    },
    deleteTask: async (parent, { taskId }, context) => {
      if (context.user) {
        const task = await Task.findByIdAndRemove(taskId);

        await User.findByIdAndUpdate(context.user._id, {
          $pull: { tasks: task._id },
        });

        return task;
      }
      throw new AuthenticationError('You need to be logged in to delete a task');
    },
    createDonation: async (parent, { amount }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in to create a donation');
      }

      const donation = {
        amount,
        user: context.user._id,
      };

      await User.findByIdAndUpdate(context.user._id, {
        $push: { donations: donation },
      });

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Stripe requires amount in cents
        currency: 'usd',
        payment_method_types: ['card'],
        metadata: {
          donationId: donation._id.toString(),
          userId: context.user._id.toString(),
        },
      });

      return {
        donation,
        clientSecret: paymentIntent.client_secret,
      };
    },
  },
};

module.exports = resolvers;
