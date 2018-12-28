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
        return newUser
      })
      .then(user => {
        return rUsers.insert(user).run(r.conn)
      })
      .then(result => {
        if(result.inserted === 1) {
          return result.generated_keys[0]
        }
        return result
      })
  }

  const queryUserByEmail = email => {
    return rUsers.filter({ email }).limit(1).run(r.conn)
      .then(cursor => cursor.toArray())
      .then(results => {
        if (results[0]) {
          const { username, email, id } = results[0]
          const user = { username, email, id }
          return user
        }
        return results
      })
  }

  return {
    insertUser,
    queryUserByEmail
  }
}