/**
  Asynchronous tests with Jest. An Internet connection and response from GitHub
  API is always assumed.

  These tests make sure data is being fetched from GitHub. I have considered
  unecessary to test function calls without parameter where a parameter is
  required, because GitHub API handles that already, by sending the object
  {"message":"Not Found","documentation_url":"https://developer.github.com/v3/users/#get-a-single-user"}.
  Thus this may be handled at the front-end.*/

const api = require('./data-api');

describe('queries to GitHub API', ()=>{
  it('get a list of users from GitHub', (done)=> {
    expect.assertions(3);
    api.getUsers(1)
    .then((data)=>{
      expect(Array.isArray(data.users)).toEqual(true);
      expect(data.users.length).toBeGreaterThan(0);
      expect(data.nextPageLink.includes(data.users[data.users.length - 1].id)).toBe(true);
      done();
    });
  })

  it('get a GitHub user\'s details', (done)=> {
    expect.assertions(2);
    api.getUserDetails('geocarlos')
    .then((data)=>{
      expect(data.login).toEqual('geocarlos');
      expect(data.id).toEqual(16767315);
      done();
    });
  })

  it('get a GitHub user\'s repositories', (done)=> {
    expect.assertions(3)
    api.getUserRepos('geocarlos')
    .then((data)=>{
      expect(Array.isArray(data)).toEqual(true);
      expect(data.length).toBeGreaterThan(0);
      expect(data[0].name).toEqual('angularjs_shopping_list');
      done();
    })
  })
});
