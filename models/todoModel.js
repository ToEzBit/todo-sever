const { v4: uuidv4 } = require("uuid");
const { readTodos, writeTodo } = require("../services/todoService");

module.exports = class Todo {
  constructor(title, completed, dueDate) {
    this.title = title;
    this.completed = completed;
    this.dueDate = dueDate;
  }

  static findAll() {
    return readTodos();
  }
  //?................ static...............

  static async create(todo) {
    const todos = await readTodos();
    todos.push({ id: uuidv4(), ...todo });
    await writeTodo(todos);
  }
  //?................ static...............

  //?................instance...............

  async save() {
    if (!this.id) {
      this.id = uuidv4();
    }

    const todos = await readTodos();
    todos.push(this);
    await writeTodo(todos);
  }
  //?................instance...............
};
