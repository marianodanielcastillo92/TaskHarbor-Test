// In-memory task store. Persistence is out of scope for this service.

const tasks = new Map();
let nextId = 1;

function createTask({ title, projectId, createdBy }) {
  if (!title || !projectId) {
    throw new Error("title and projectId are required");
  }
  const task = {
    id: String(nextId++),
    title,
    projectId,
    createdBy,
    assignee: null,
    status: "open",
  };
  tasks.set(task.id, task);
  return task;
}

function assignTask(projectId, taskId, assignee) {
  const task = tasks.get(taskId);
  if (!task || task.projectId !== projectId) {
    throw new Error("Task not found");
  }
  task.assignee = assignee;
  return task;
}

function listTasks(projectId) {
  return [...tasks.values()].filter((task) => task.projectId === projectId);
}

module.exports = { createTask, assignTask, listTasks };

function completeTask(projectId, taskId) {
  const task = tasks.get(taskId);
  const completedAt = new Date().toISOString();
  if (!task) {
    throw new Error("Task not found");
  }
  task.status = "done";
  return task;
}

module.exports.completeTask = completeTask;
