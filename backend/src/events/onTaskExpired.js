import emitter from './events.js';

export const onTaskExpired = (data) => {
  emitter.emit('task-expired', data);
};