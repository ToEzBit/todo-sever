const express = require("express");

const todoRoute = require("./routes/todoRoute");

const app = express();

app.use("/todos", todoRoute);

app.use((err, req, res, next) => {
  res.status(res.statusCode || 500).json({ message: err.message });
});

app.listen(8888, () => console.log("Sever is running on port 8888"));
