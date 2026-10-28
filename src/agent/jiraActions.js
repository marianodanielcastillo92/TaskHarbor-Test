// Jira actions the agent runs on the asking person's own Jira account.

const writeLog = [];

function jiraFor(person) {
  if (!person.jiraAccount) {
    throw new Error("Link your Jira account to use Jira actions");
  }
  return person.jiraAccount;
}

async function readIssue(person, issueKey) {
  return jiraFor(person).client.getIssue(issueKey);
}

function proposeIssue(person, draft) {
  return {
    accountId: jiraFor(person).id,
    project: draft.project,
    summary: draft.summary,
    description: draft.description,
  };
}

// Creates the proposed ticket in one step, without a separate confirmation.
async function createIssue(person, proposal) {
  const account = jiraFor(person);
  const issue = await account.client.createIssue(proposal);
  writeLog.push({
    who: person.id,
    accountId: account.id,
    payload: proposal,
    at: new Date().toISOString(),
  });
  return issue;
}

module.exports = { readIssue, proposeIssue, createIssue, writeLog };
