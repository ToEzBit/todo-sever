const fs = require("fs/promises");

exports.readFile = async (path) => {
  const data = await fs.readFile(path, "utf8");
  return JSON.parse(data);
};

exports.writeFile = async (path, data) =>
  fs.writeFile(path, JSON.stringify(data));
