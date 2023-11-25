const mysql = require('../config/mysql-config');

class TaskModel
{
  async add(task) {
    const {
      name,
      completion_date,
      status
    } = task;

    const task = await mysql.query(`
      INSERT INTO tasks 
      (name, completion_date, status)
      VALUES(?, ?, ?)
    `, [name, completion_date, status]);

    return task[0][0];
  }

  async update(name) {
    
  }

  async delete(name) {
    const task = await mysql.query(`
      DELETE
      FROM tasks
      WHERE name = ?
    `, [ name ]);

    return task[0][0];
  }

  async get(name) {
    const task = await mysql.query(`
      SELECT *
      FROM tasks
      WHERE name = ?
    `, [ name ]);

    return task[0][0];
  }

  async getAll() {
    const tasks = await mysql.query(`
      SELECT *
      FROM tasks
    `);

    return tasks[0];
  }
}

const taskModel = new TaskModel();

module.exports = taskModel;