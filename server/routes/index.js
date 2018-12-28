const router = require('express').Router()

module.exports = r => {
  const auth = require('./auth')(r)

  router.use('/auth', auth)

  return router
}

