import { getInput, setFailed } from '@actions/core';
import { context } from '@actions/github';
import fetch from 'node-fetch';

try {
  console.log({payload: context.payload});

  const { pull_request } = context.payload;

  console.log({pull_request});


  const {
    pull_request: {
      head: { ref },
    },
  } = context.payload;

  const [taskID] = ref.split('/');

  const status = getInput('status');
  const teamID = getInput('team-id');

  const response = await fetch(`${process.env.CLICKUP_API_URL}/${taskID}/?custom_task_ids=true&team_id=${teamID}`, {
    method: 'PUT',
    headers: {
      Authorization:
        process.env.CLICKUP_API_TOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      status,
    }),
  });

  const data = await response.json();

  console.log({ data })
} catch (error) {
  setFailed(error.message);
}
