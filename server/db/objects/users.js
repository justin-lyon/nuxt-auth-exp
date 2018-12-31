const bcrypt = require('bcrypt')

module.exports = r => {
  const rUsers = r.table('Users')

  const insertUser = ({ username, email, password }) => {
    const now = new Date()
    const newUser = {
      username,
      email,
      createdDate: now
    }

    return bcrypt.hash(password, 10)
      .then(hash => {
        newUser.password = hash
        return rUsers.insert(newUser).run(r.conn)
      })
      .then(result => {
        if(result.inserted === 1) {
          return result.generated_keys[0]
        }
        return result
      })
  }

  const queryUserByEmail = (email, fields) => {
    return rUsers.filter({ email }).pluck(...fields).limit(1).run(r.conn)
      .then(cursor => cursor.toArray())
      .then(results => {
        if (results[0]) {
          const { username, email, id, password } = results[0]
          const user = { username, email, id, password }
          return user
        }
        return null
      })
  }

  const queryUserById = id => {
    return rUsers.get(id).run(r.conn)
      .then(console.log)
      .catch(console.error)
  }

  return {
    insertUser,
    queryUserByEmail
  }
}