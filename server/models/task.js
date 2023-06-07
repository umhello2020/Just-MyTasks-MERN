const { Schema, model } = require('mongoose');

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    description: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  }
);

const Task = model('Task', taskSchema);

module.exports = Task;