const r = require('rethinkdb')
require('rethinkdb-init')(r)

const config = require('./config')
const schema = require('./schema')

r.init(config, schema)
  .then(conn => {
    r.conn = conn
  })
  .catch(err => {
    console.error(`Error initializing RethinkDB, ${config.db}.`, err)
  })

module.exports = r