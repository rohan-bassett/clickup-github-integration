import { getInput, setFailed } from '@actions/core';
import { context } from '@actions/github';
import fetch from 'node-fetch';

try {
  const payload = JSON.stringify(context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);

  const {
    pull_request: {
      head: { ref = null },
    },
  } = context.payload;

  const [taskID] = ref.split('/');

  const status = getInput('status');
  const teamID = getInput('team-id');

  const response = await fetch(
    `${process.env.CLICKUP_API_URL}/task/${taskID}/?custom_task_ids=true&team_id=${teamID}`,
    {
      method: 'PUT',
      headers: {
        Authorization: process.env.CLICKUP_API_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status,
      }),
    }
  );

  const data = await response.json();

  console.log({ data });
} catch (error) {
  setFailed(error.message);
}
