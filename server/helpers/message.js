const client = require('../config/database');

async function createMessage(id, userId, username, content, timestamp) {
  const query = 'INSERT INTO messages (id, userId, username, content, timestamp) VALUES (?, ?, ?, ?, ?)';
  await client.execute(query, [id, userId, username, content, timestamp]);
}

async function getMessages(limit) {
  const query = 'SELECT * FROM messages LIMIT ?';
  const result = await client.execute(query, [limit]);
  return result.rows;
}

module.exports = {
  createMessage,
  getMessages
};
