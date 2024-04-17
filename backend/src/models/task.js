import taskSchema from './taskSchema.js';

const getAllTasks = async (filters, sortBy) => {
  return new Promise((acc, rej) => {
    taskSchema.find(filters).sort(sortBy)
      .then((data) => {
        acc(data);
      })
      .catch((err) => {
        rej(err);
      });
  });
};

const getTask = (id) => {
  return new Promise((acc, rej) => {
    taskSchema.findById(id)
      .then((data) => {
        acc(data);
      })
      .catch((err) => {
        rej(err);
      });
  });
}

const addTask = (task) => {
  return new Promise((acc, rej) => {
    const newTask = new taskSchema(task);

    newTask.save()
      .then((data) => {
        acc(newTask);
      })
      .catch((err) => {
        rej(err);
      });
  });
}

const updateTask = (id, newTask) => {
  return new Promise((acc, rej) => {
    taskSchema.findByIdAndUpdate(id, newTask)
      .then((data) => {
        acc(data);
      })
      .catch((err) => {
        rej(err);
      });
  });
}

const deleteTask = (id) => {
  return new Promise((acc, rej) => {
    taskSchema.findByIdAndDelete(id)
      .then((data) => {
        acc(data);
      })
      .catch((err) => {
        rej(err);
      });
  })
}

const deleteAllTasks = () => {
  return new Promise((acc, rej) => {
    taskSchema.deleteMany({})
      .then((data) => {
        acc(data);
      })
      .catch((err) => {
        rej(err);
      });
  });
}

export default {
  getAllTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
}