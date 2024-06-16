const client = require('../config/database');

const Message = client.mapper.forModel('Message', {
  tables: ['messages'],
  columns: {
    id: 'id',
    userId: 'userId',
    username: 'username',
    content: 'content',
    timestamp: 'timestamp'
  },
  keyspace: 'chat_app'
});

module.exports = Message;
