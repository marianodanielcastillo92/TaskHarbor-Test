// Resolves the signed-in user from a session token.

const { randomUUID } = require("crypto");

const sessions = new Map();

function startSession(user) {
  const token = randomUUID();
  sessions.set(token, { userId: user.id, projectIds: user.projectIds || [] });
  return token;
}

function resolveUser(token) {
  const session = sessions.get(token);
  if (!session) {
    throw new Error("Not signed in");
  }
  return session;
}

function canAccessProject(session, projectId) {
  return session.projectIds.includes(projectId);
}

module.exports = { startSession, resolveUser, canAccessProject };
