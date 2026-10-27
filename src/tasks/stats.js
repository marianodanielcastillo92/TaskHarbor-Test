const { listTasks } = require("./store");

function countOpenTasks(projectId) {
  return listTasks(projectId).filter((task) => task.status === "open").length;
}

module.exports = { countOpenTasks };
