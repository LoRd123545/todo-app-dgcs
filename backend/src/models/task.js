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
    required: true,
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