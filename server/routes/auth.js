const router = require('express').Router()
const bcrypt = require('bcrypt')
const createError = require('http-errors')
const jwt = require('../utils/jwt')

module.exports = db => {
  const rUsers = require('../db/objects/users')(db)

  const register = (req, res, next) => {
    const { username, email, password } = req.body
    if(!username || !email || !password) {
      return next(createError(422, 'Username, email, and password required.'))
    }

    rUsers.queryUserByEmail(email, ['email'])
      .then(user => {
        if(user) {
          return next(createError(422, 'This email is already registered.'))
        }
        return rUsers.insertUser(req.body)
      })
      .then(id => {
        if (id) {
          return res.json({ id })
        }
      })
      .catch(err => {
        console.error('Fatal Error: ', err.message)
        return next(createError(err.statusCode || 500, err.message || 'Unhandled Exception.'))
      })
  }

  const login = (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
      return next(createError(422, 'Email and password required.'))
    }

    rUsers.queryUserByEmail(email, ['id', 'username', 'email', 'password'])
      .then(user => {
        if (!user) {
          return next(createError(401, 'Invalid email or password.'))
        }

        return bcrypt.compare(password, user.password)
          .then(isValid => {
            if (!isValid) {
              return next(createError(401, 'Invalid email or password.'))
            }

            const token = jwt.serialize({ id: user.id, email: user.email })
            res.json({ token })
          })
          .catch(err => {
            return next(createError(err.statusCode, error.message))
          })
      })
      .catch(err => {
        console.error('Error logging in. ', err.message)
        return next(createError(err.statusCode || 500, err.message || 'Unhandled Exception.'))
      })
  }

  const me = (req, res, next) => {
    const authorization = req.headers.authorization
    const accessToken = authorization.replace('Bearer ', '')

    if (!accessToken) {
      return next(createError(401, 'Unauthorized.'))
    }

    jwt.deserialize(accessToken)
      .then(decoded => {
        const now = Date.now()
        if(decoded.exp >= now) {
          return next(createError(401, 'Unauthorized.'))
        }

        return rUsers.queryUserById(decoded.id)
      })
      .then(user => {
        if (!user) {
          return next(createError(400, 'User not found.'))
        }
        console.log('found user: ', user)
        res.json(user)
      })
      .catch(err => {
        console.error('Error: ', err.message)
        return next(createError(err.statusCode || 500, err.message || 'Unhandled Exception.'))
      })
  }

  router.post('/register', register)
  router.post('/login', login)
  router.get('/me', me)

  return router
}