const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET || 'slick-rick'
const JWT_DURATION = process.env.JWT_DURATION || '7d'

const serialize = ({ id, email }) => {
  const token = jwt.sign({ id, email }, JWT_SECRET, { expiresIn: JWT_DURATION })
  return token
}

const deserialize = token => {
  return new Promise((resolve, reject) => {
    return jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err)
      }
      resolve(decoded)
    })
  })
}

module.exports = {
  serialize,
  deserialize
}
