const mysql = require('../config/mysql-config');

class TaskModel
{
  async add(task) {
    const {
      name,
      completion_date,
      status
    } = task;

    await mysql.query(`
      INSERT INTO tasks 
      (name, completion_date, status)
      VALUES(?, ?, ?)
    `, [name, completion_date, status]);
  }

  update(name) {
    
  }

  delete(name) {

  }

  get(name) {

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