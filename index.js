import { getInput, setFailed } from '@actions/core';
import { context } from '@actions/github';

try {
  const URL = process.env.CLICKUP_API_URL;
  const TOKEN = process.env.CLICKUP_API_TOKEN;

  const teamID = getInput('team-id');

  const payload = JSON.stringify(context.payload, undefined, 2);

  console.log(`The event payload: ${payload}`);

  console.log({URL, TOKEN, teamID})
} catch (error) {
  setFailed(error.message);
}
