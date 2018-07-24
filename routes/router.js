const express = require('express');
const router = express.Router();
const api = require('../data-api/data-api');
const cache = require('memory-cache');

const memCache = new cache.Cache();
const cacheMiddleware = (duration) => {
  return(req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url
    let cacheContent = memCache.get(key);
    if (cacheContent) {
      res.send(cacheContent);
      return
    } else {
      res.sendResponse = res.send
      res.send = (body) => {
        memCache.put(key, body, duration * 1000);
        res.sendResponse(body)
      }
      next()
    }
  }
}

/* GET users. */
router.get('/api/users', cacheMiddleware(3600), (req, res) => {

  const sinceParam = req.query['since'];

  api.getUsers(sinceParam).then(data => {
    res.json(data);
  })
});

/* GET a given user's details */
router.get('/api/users/:username/details', cacheMiddleware(3600), (req, res, next) => {

  const username = req.params['username'];

  api.getUserDetails(username).then(data => {
    res.json(data);
  })
})

/* GET a given user's repositories */
router.get('/api/users/:username/repos', cacheMiddleware(3600), (req, res, next) => {

  const username = req.params['username'];

  api.getUserRepos(username).then(data => {
    res.json(data);
  })
})

module.exports = router;
