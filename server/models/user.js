const client = require('../config/database');

const User = client.mapper.forModel('User', {
  tables: ['users'],
  columns: {
    id: 'id',
    username: 'username',
    password: 'password'
  },
  keyspace: 'chat_app'
});

module.exports = User;
