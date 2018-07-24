const fetch = require('node-fetch');
const baseUrl = 'https://api.github.com/users';

/** GET - /api/users?since={number}
This endpoint must return a list of GitHub users and the link for the next page.*/
module.exports.getUsers = (sinceParam) => {
  return fetch(`${baseUrl}?since=${sinceParam}`)
  .then(res => res.json())
  .then(data => {
    return {users: data, nextPageLink: `${baseUrl}?since=${data[data.length - 1].id}`};
  })
  .catch(() => "Unable to fetch users.");
}

/** GET - /api/users/:username/details
This endpoint must return the details of a GitHub user */
module.exports.getUserDetails = (username) => {
  return fetch(`${baseUrl}/${username}`)
  .then(res => res.json())
  .then(data => data)
  .catch(() => `Unable to fetch details for user ${username}`);;
}

/** GET - /api/users/:username/repos
This endpoint must return a list with all user repositories */
module.exports.getUserRepos = (username) => {
  return fetch(`${baseUrl}/${username}/repos`)
  .then(res => res.json())
  .then(data => data)
  .catch(() => `Unable to fetch repos for user ${username}`);
}
