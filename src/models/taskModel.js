import mysql from '../config/mysql-config.js';

/* all functions return json objects */

/* returns all tasks or error message */
async function getAllTasks(userID) {
  try {
    const result = await mysql.execute(`
      SELECT
      id, name, description, completion_date, status
      FROM tasks
      WHERE user_id = ?
    `,[ userID ]);

    return result[0];
  } catch(err) {
    console.error(err);
    return err.sqlMessage;
  }
}

/* returns task with given id or error message */
async function getTask(id, userID) {
  try {
    const result = await mysql.execute(`
      SELECT
      id, name, description, completion_date, status
      FROM tasks
      WHERE id = ? AND user_id = ?
    `, [ id, userID ]);

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
    status,
    user_id
  } = task;

  try {
    await mysql.execute(`
      INSERT INTO tasks 
      VALUES(?, ?, ?, ?, ?, ?)
    `, [id, name, description, completion_date, status, user_id]);
  
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
    status,
    user_id
  } = task;

  try {
    await mysql.execute(`
      UPDATE tasks
      SET name = ?, description = ?, completion_date = ?, status = ?
      WHERE id = ? AND user_id = ?
    `, [ name, description, completion_date, status, id, user_id ]);
  
    return {
      "message": "successfully updated!"
    };
  } catch(err) {
    console.log(err)
    return err.sqlMessage;
  }
}

/* returns error message or success message */
async function deleteTask(id, userID) {
  try {
    await mysql.execute(`
      DELETE
      FROM tasks
      WHERE id = ? AND user_id = ?
    `, [ id, userID ]);
  
    return {
      "message": "successfully deleted!"
    };
  } catch(err) {
    console.error(err);
    return err.sqlMessage;
  }
}

async function deleteAllTasks(userID) {
  try {
    await mysql.execute(`
      DELETE
      FROM tasks
      WHERE user_id = ?
    `, [ userID ]);

    return {
      "message": "successfully deleted all tasks!"
    };
  } catch(err) {
    console.error(err);
    return err.sqlMessage;
  }
}

export default {
  getAllTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
  deleteAllTasks
};