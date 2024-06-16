const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { client } = require('../config/database');
const {success, serverError} = require('../helpers/response')
const JWT_SECRET = '423784a2d864782cs364a78d';

const login = async (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ? LIMIT 1';
    try {
        const result = await client.execute(query, [username], { prepare: true });
        const user = result.rows[0];
        
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET);
            success({res, data:{user,token}});
        } else {
            serverError({res, status:401, message:'Invalid credentials'})
        }
    } catch (err) {
        console.error('Error executing login query:', err);
        serverError({res, error: err});
    }
};

const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (id, username, password) VALUES (uuid(), ?, ?)';
        await client.execute(query, [username, hashedPassword], { prepare: true });
    
        const result = await client.execute('SELECT * FROM users WHERE username = ? LIMIT 1', [username], { prepare: true });
        const user = result.rows[0];
    
        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET);
    
        success({ res, data: { user, token } });
    } catch (error) {
        console.error('Error executing login query:', err);
        serverError({res, error: err});
    }
};

module.exports = {login, register}