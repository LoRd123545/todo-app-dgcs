const mysql = require('../config/mysql-config');

async function getAllTasks() {
  try {
    const result = await mysql.execute(`
      SELECT *
      FROM tasks
    `);

    return result[0];
  } catch(err) {
    console.error(err);
  }
}

async function getTask(id) {
  try {
    const result = await mysql.execute(`
      SELECT *
      FROM tasks
      WHERE id = ?
    `, [id]);
  
    return result[0][0];
  } catch(err) {
    console.error(err);
  }
}

async function addTask(task) {
  try {
    const result = await mysql.execute(`
      INSERT INTO tasks 
      VALUES(?, ?, ?, ?, ?)
    `, [task.id, task.name, task.description, task.completion_date, task.status]);
  
    return result[0][0];
  } catch(err) {
    console.error(err);
  }
}

async function updateTask(id, task) {
  try {
    const result = await mysql.execute(`
      UPDATE tasks
      SET name = ?, description = ?, completion_date = ?, status = ?
      WHERE id = ?
    `, [task.name, task.description, task.completion_date, task.status, id]);
  
    return result[0][0];
  } catch(err) {
    console.error(err);
  }
}

async function deleteTask(id) {
  try {
    const result = await mysql.execute(`
      DELETE
      FROM tasks
      WHERE id = ?
    `, [id]);
  
    return result[0][0];
  } catch(err) {
    console.error(err);
  }
}

module.exports = {
  getAllTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask
};