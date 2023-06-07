const db = require('./connection');
const User = require('../models/user');
const Task = require('../models/task');

db.once('open', async () => {
  try {
    await Task.deleteMany({});
    await User.deleteMany({});

    const users = await User.create([
      {
        username: 'user1',
        email: 'user1@example.com',
        password: 'password1',
      },
      {
        username: 'user2',
        email: 'user2@example.com',
        password: 'password2',
      },
    ]);

    const taskData = [
      {
        title: 'Task 1',
        description: 'Description of Task 1',
        completed: false,
        user: users[0]._id,
      },
      {
        title: 'Task 2',
        description: 'Description of Task 2',
        completed: true,
        user: users[1]._id,
      },
    ];

    for (let i = 0; i < taskData.length; i++) {
      const task = await Task.create(taskData[i]);
      const userId = task.user.toString();

      await User.findByIdAndUpdate(userId, {
        $push: { tasks: task._id },
      });
    }

    console.log('Seed data created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
});
