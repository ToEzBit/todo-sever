const validator = require("validator");
const createError = require("../utility/createError");
const { v4: uuidv4 } = require("uuid");
const { readTodos, writeTodo } = require("../services/todoService");

//TODO create todo: POST/todos
//? BODY: title(require), completed(default:fault), dueDate(date format)
//* validator
//* 1.check title is string
//* 2.check title is not a empty
//* 3.completed is boolean
//* 4.Date is string

exports.createTodo = async (req, res, next) => {
  try {
    const { title, completed = false, dueDate = null } = req.body;
    if (typeof title !== "string") {
      // return res.status(400).json({ message: "title must be a string" });
      createError("title must be a string", 400);
    }

    if (validator.isEmpty(title)) {
      //   return res.status(400).json({ message: "title is require" });
      createError("title is require", 400);
    }

    if (typeof completed != "boolean") {
      //   return res.status(400).json({ message: "completed must be a boolean" });
      createError("completed must be a boolean", 400);
    }

    if (dueDate !== null && !validator.isDate(dueDate + " ")) {
      //   return res.status(400).json({ message: "dueDate must be a date string" });
      createError("dueDate must be a date string", 400);
    }

    const todos = await readTodos();
    const todo = {
      id: uuidv4(),
      title,
      completed,
      dueDate: dueDate === null ? dueDate : new Date(dueDate),
    };
    todos.push(todo);

    await writeTodo(todos);

    res.json({ todo });
  } catch (err) {
    next(err);
  }
};

//TODO Get all todos :GET /todos
//?GET : /todos

exports.getAllTodo = async (req, res, next) => {
  try {
    const todos = await readTodos();
    res.json({ todos });
  } catch (err) {
    next(err);
  }
};

//TODO Get to do by ID
//?GET : {PARAM : id}

exports.getTodoById = async (req, res, next) => {
  try {
    const params = req.params;
    const todos = await readTodos();
    const todo = todos.find((el) => el.id === params.id);
    res.json({ todo: todo ?? null });
  } catch (err) {
    next(err);
  }
};

//TODO Delete to do by id
//?DELETE : {PARAM : id}

exports.deleteTodo = async (req, res, next) => {
  try {
    const params = req.params;
    const todos = await readTodos();
    const idx = todos.findIndex((el) => el.id === params.id);
    if (idx === -1) {
      createError("todos is not found", 400);
    }
    todos.splice(idx, 1);
    await writeTodo(todos);
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};

//TODO Update todo :PUT /todos

exports.updateTodo = async (req, res, next) => {
  try {
    const params = req.params;
    const todos = await readTodos();
    const idx = todos.findIndex((el) => el.id === params.id);

    if (idx === -1) {
      createError("todos is not found", 400);
    }

    const {
      title = todos[idx].title,
      completed = todos[idx].completed,
      dueDate = todos[idx].dueDate,
    } = req.body;

    if (typeof title !== "string") {
      // return res.status(400).json({ message: "title must be a string" });
      createError("title must be a string", 400);
    }

    if (validator.isEmpty(title)) {
      //   return res.status(400).json({ message: "title is require" });
      createError("title is require", 400);
    }

    if (typeof completed != "boolean") {
      //   return res.status(400).json({ message: "completed must be a boolean" });
      createError("completed must be a boolean", 400);
    }

    if (dueDate !== null && !validator.isDate(dueDate + " ")) {
      //   return res.status(400).json({ message: "dueDate must be a date string" });
      createError("dueDate must be a date string", 400);
    }

    todos[idx] = {
      id: params.id,
      title,
      completed,
      dueDate: dueDate === null ? dueDate : new Date(dueDate),
    };

    await writeTodo(todos);
    res.json({ todo: todos[idx] });
  } catch (err) {
    next(err);
  }
};
