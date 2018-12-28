const jwt = require('jsonwebtoken')
const router = require('express').Router()
const { JWT_SECRET, JWT_DURATION } = require('../jwt-config')

module.exports = r => {

  const rUsers = require('../db/objects/users')(r)

  const register = (req, res) => {
    console.log('req.body', req.body)
    if (!username || !email || !password) {
      return res.status(400).json({
        type: 'error',
        message: 'Username, Email, and Password are required.'
      })
    }

    const now = new Date()
    const newUser = {
      username,
      email,
      createdDate: now
    }

    rUsers.queryUserByEmail(email)
      .then(user => {
        console.log(user)
        if(user.email) {
          return res.status(400).json({
            type: 'error',
            message: 'This email has already been registered.'
          })
        }
      })
      .then(rUsers.insertUser(newUser))
      .then(userId => {
        newUser.id = userId
        console.log('created new user', user)
        return user
      })
      .then(user => {
        const data = {
          type: 'success',
          message: 'User logged in.',
          user,
          token: jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expires: JWT_DURATION })
        }
        console.log('tokenized data', data)
        return res.json(data)
      })
      .catch(err => {
        console.error('Error creating user.', err)
      })
  }

  const login = (req, res) => {
    console.log('req.body', req.body)
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({
        type: 'error',
        message: 'Username or Email, and Password are required.'
      })
    }

    rUsers.queryUserByEmail(email)
      .then(user => {
        console.log(user)
        return res.json(user)
      })
      .catch(err => {
        console.error('Error during query by email.', err)
      })
  }

  const me = (req, res) => {}

  router.post('/register', register)
  router.post('/login', login)
  router.get('/me', me)

  return router
}