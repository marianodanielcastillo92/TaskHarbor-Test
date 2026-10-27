// Task handlers. A project the user can't access answers the same as one that doesn't exist.

const { createTask, assignTask, listTasks } = require("../tasks/store");
const { resolveUser, canAccessProject } = require("../auth/session");

function requireProject(token, projectId) {
  const session = resolveUser(token);
  if (!canAccessProject(session, projectId)) {
    throw new Error("Not found");
  }
  return session;
}

function handleList(token, projectId) {
  requireProject(token, projectId);
  return listTasks(projectId);
}

function handleCreate(token, body) {
  const session = requireProject(token, body.projectId);
  return createTask({ ...body, createdBy: session.userId });
}

function handleAssign(token, projectId, taskId, assignee) {
  requireProject(token, projectId);
  return assignTask(projectId, taskId, assignee);
}

module.exports = { handleList, handleCreate, handleAssign };
