const client = require('../config/database');

async function createUser(id, username, password) {
  const query = 'INSERT INTO users (id, username, password) VALUES (?, ?, ?)';
  await client.execute(query, [id, username, password]);
}

async function getUserByUsername(username) {
  const query = 'SELECT * FROM users WHERE username = ?';
  const result = await client.execute(query, [username]);
  return result.rows[0];
}

// Other CRUD operations for users can be defined similarly

module.exports = {
  createUser,
  getUserByUsername
  // Other exported functions
};
