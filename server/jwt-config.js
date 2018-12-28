const JWT_SECRET = process.env.JWT_SECRET || 'pickle-rick'
const JWT_DURATION = process.env.JWT_DURATION || '7d'

module.exports = {
  JWT_SECRET,
  JWT_DURATION
}