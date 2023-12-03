const mysql = require('../config/mysql-config');
const { catchAsync } = require('../middleware/errors');

/* all functions return json objects */

/* returns all tasks or error message */
async function getAllTasks() {
  try {
    const result = await mysql.execute(`
      SELECT *
      FROM tasks
    `);

    return result[0];
  } catch(err) {
    console.error(err);
    return err.sqlMessage;
  }
}

/* returns task with given id or error message */
async function getTask(id) {
  try {
    const result = await mysql.execute(`
      SELECT *
      FROM tasks
      WHERE id = ?
    `, [id]);

    if(!result[0][0]) {
      return {
        "error": {
          "desc": "task with this id doesn't exist"
        }
      }
    }
  
    return result[0][0];
  } catch(err) {
    console.error(err);
    return err.sqlMessage;
  }
}

/* returns error message or success message */
async function addTask(task) {
  const {
    id,
    name,
    description,
    completion_date,
    status
  } = task;

  try {
    await mysql.execute(`
      INSERT INTO tasks 
      VALUES(?, ?, ?, ?, ?)
    `, [id, name, description, completion_date, status]);
  
    return {
      "message": "successfully added task"
    };
  } catch(err) {
    console.log(err)
    return err.sqlMessage;
  }
}

/* returns error message or success message */
async function updateTask(task) {
  const {
    id,
    name,
    description,
    completion_date,
    status
  } = task;

  try {
    await mysql.execute(`
      UPDATE tasks
      SET name = ?, description = ?, completion_date = ?, status = ?
      WHERE id = ?
    `, [name, description, completion_date, status, id]);
  
    return {
      "message": "successfully updated!"
    };
  } catch(err) {
    console.log(err)
    return err.sqlMessage;
  }
}

/* returns error message or success message */
async function deleteTask(id) {
  try {
    await mysql.execute(`
      DELETE
      FROM tasks
      WHERE id = ?
    `, [id]);
  
    return {
      "message": "successfully deleted!"
    };
  } catch(err) {
    console.error(err);
    return err.sqlMessage;
  }
}

async function deleteAllTasks() {
  try {
    await mysql.execute(`
      DELETE
      FROM tasks
    `);

    return {
      "message": "successfully deleted all tasks!"
    };
  } catch(err) {
    console.error(err);
    return err.sqlMessage;
  }
}

module.exports = {
  getAllTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
  deleteAllTasks
};