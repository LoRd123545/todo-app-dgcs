import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    default: 'not-started',
    enum: ['not-started', 'in-progress', 'done'],
  },
  description: {
    type: String,
    default: 'describe your task'
  },
  favourite: {
    type: Boolean,
    default: false,
  },
  userID: {
    type: String,
    required: true,
  },
});

export default model('tasks', taskSchema);