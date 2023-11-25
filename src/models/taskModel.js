const mysql = require('../config/mysql-config');

async function getAllTasks() {
  const result = await mysql.query(`
    SELECT *
    FROM tasks
  `);

  return result[0];
}

async function getTask(id) {
  const result = await mysql.query(`
    SELECT *
    FROM tasks
    WHERE id = ?
  `, [id]);

  return result[0][0];
}

async function addTask(task) {
  const result = await mysql.query(`
    INSERT INTO tasks 
    VALUES(?, ?, ?, ?)
  `, [task.id, task.name, task.completion_date, task.status]);

  return result[0][0];
}

async function updateTask(id, task) {
  const result = await mysql.query(`
    UPDATE tasks
    SET name = ?, completion_date = ?, status = ?
    WHERE id = ?
  `, [task.name, task.completion_date, task.status, id]);

  return result[0][0];
}

async function deleteTask(id) {
  const result = await mysql.query(`
    DELETE
    FROM tasks
    WHERE id = ?
  `, [id]);

  return result[0][0];
}

module.exports = {
  getAllTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask
};