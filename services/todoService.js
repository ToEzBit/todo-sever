const { readFile, writeFile } = require("../utility/file");

exports.readTodos = () => readFile("db/todo.json");

exports.writeTodo = (todo) => writeFile("db/todo.json", todo);
