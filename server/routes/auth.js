const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()
const { JWT_SECRET, JWT_DURATION } = require('../jwt-config')

module.exports = r => {

  const rUsers = require('../db/objects/users')(r)

  const register = (req, res) => {
    console.log('req.body', req.body)
    const { username, email, password } = req.body

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
      password,
      createdDate: now
    }

    rUsers.queryUserByEmail(email, ['email'])
      .then(user => {
        console.log(user)
        if(user) {
          throw new Error('This email has already been registered.')
        }
        return rUsers.insertUser(newUser)
      })
      .then(userId => {
        newUser.id = userId
        console.log('created new user', newUser)
        return newUser
      })
      .then(user => {
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_DURATION })
        const cleanUser = {
          username: user.username,
          email: user.email,
          id: user.id,
          token
        }
        console.log('tokenized data', cleanUser)
        return res.json(cleanUser)
      })
      .catch(err => {
        console.error('Error creating user.', err)
        return res.status(500).json(err)
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

    rUsers.queryUserByEmail(email, ['username', 'email', 'id', 'password'])
      .then(user => {
        console.log(user)
        if(user) {
          return user
        }
        throw new Error('User not found.')
      })
      .then(user => {
        return bcrypt.compare(password, user.password)
          .then(pwIsValid => {
            if (pwIsValid) {
              const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_DURATION })
              return res.json({
                username: user.username,
                email: user.email,
                id: user.id,
                token
              })
            }

            throw new Error('Invalid Username or Password.')
          })
      })
      .catch(err => {
        console.error('Error during login.', err)
        return res.status(500).json(err)
      })
  }

  const me = (req, res) => {
    const token = req.headers['x-access-token']
    if(!token) return res.status(400).json({
      type: 'error',
      message: 'x-access-token header not found.'
    })
    const user = jwt.verify(token, JWT_SECRET)
    res.json(user)
  }

  router.post('/register', register)
  router.post('/login', login)
  router.get('/me', me)

  return router
}