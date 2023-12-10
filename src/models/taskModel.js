import mysql from '../config/mysql-config.js';

/* database initialization */
mysql.init().catch(err => {
  console.log(err);
  process.exit(1);
});

/* all functions return json objects */

/* returns all tasks or error message */
async function getAllTasks(userID) {
  return new Promise((acc, rej) => {
    mysql.execute(`
      SELECT
      id, name, description, completion_date, status
      FROM tasks
      WHERE user_id = ?
    `, [ userID ],
      (err, result) => {
        if(err) {
          return rej(err);
        }

        acc(result);

    });
  });
}

/* returns task with given id or error message */
async function getTask(id, userID) {
  return new Promise((acc, rej) => {
    mysql.execute(`
      SELECT
      id, name, description, completion_date, status
      FROM tasks
      WHERE id = ? AND user_id = ?
    `, [ id, userID ],
    (err, result) => {
      if(err) {
        return rej(err);
      }

      acc(result[0]);
    });
  });
}

/* returns error message or success message */
async function addTask(task) {
  const {
    id,
    name,
    description,
    completion_date,
    status,
    user_id
  } = task;

  return new Promise((acc, rej) => {
    mysql.execute(`
      INSERT INTO tasks
      VALUES(?, ?, ?, ?, ?, ?)
    `, [ id, name, description, completion_date, status, user_id ],
    (err, result) => {
      if(err) {
        return rej(err);
      }

      acc({
        'message': 'successfully added task'
      });
    });
  });
}

/* returns error message or success message */
async function updateTask(task) {
  const {
    id,
    name,
    description,
    completion_date,
    status,
    user_id
  } = task;

  return new Promise((acc, rej) => {
    mysql.execute(`
      UPDATE tasks
      SET name = ?, description = ?, completion_date = ?, status = ?
      WHERE id = ? AND user_id = ?
    `, [ name, description, completion_date, status, id, user_id ],
    (err, result) => {
      if(err) {
        return rej(err);
      }

      acc({
        'message': 'successfully updated!'
      });
    });
  });
}

/* returns error message or success message */
async function deleteTask(id, userID) {
  return new Promise((acc, rej) => {
    mysql.execute(`
      DELETE
      FROM tasks
      WHERE id = ? AND user_id = ?
    `, [ id, userID ],
    (err, result) => {
      if(err) {
        return rej(err);
      }

      acc({
        'message': `successfully deleted!`
      });
    });
  });
}

async function deleteAllTasks(userID) {
  return new Promise((acc, rej) => {
    mysql.execute(`
      DELETE
      FROM tasks
      WHERE user_id = ?
    `, [ userID ],
    (err, result) => {
      if(err) {
        return rej(err);
      }

      acc({
        'message': 'successfully deleted all tasks!'
      });
    });
  });
}

export default {
  getAllTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
  deleteAllTasks
};