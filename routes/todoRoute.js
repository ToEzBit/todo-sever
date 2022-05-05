const express = require("express");

const router = express.Router();
const todoController = require("../controllers/todoController");

router.use(express.json());

router.post("/", todoController.createTodo);

router.get("/", todoController.getAllTodo);

router.get("/:id", todoController.getTodoById);

router.delete("/:id", todoController.deleteTodo);

router.put("/:id", todoController.updateTodo);

module.exports = router;
