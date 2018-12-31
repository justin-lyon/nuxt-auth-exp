module.exports = [
  {
    name: 'Users',
    primaryKey: 'id',
    indexes: [
      'username',
      'email',
      'password',
    ]
  }
]