const router = require('express').Router()

const logger = (req, res, next) => {
  console.log('req.originalUrl', req.originalUrl)
  console.log('req.body', req.body)
  console.log('req.headers.authorization', req.headers.authorization)
  next()
}

const errorHandler = (err, req, res, next) => {
  if (err) {
    console.log('errorHandler', {
      statusCode: err.statusCode,
      message: err.message
    })
    return res.status(err.statusCode || 500).json(err || { message: 'Unhandled Exception.' })
  }
  next()
}

module.exports = db => {
  const auth = require('./auth')(db)

  router.use('/auth', logger)

  router.use('/auth', auth)

  router.use('/', errorHandler)
  return router
}