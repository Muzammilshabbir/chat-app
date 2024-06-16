const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');
const { connectClient,client, createSchema } = require('./config/database');
const app = express();
const server = http.createServer(app);
const { v4: uuidv4 } = require('uuid');

const io = socketIo(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

const cors = require('cors');
// route setup
const routeSetup = require("./routes/v1");

app.use(bodyParser.json());
app.use(cors())
routeSetup(app)

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('message', async (messageData) => {
        const { userId, username, content } = messageData;
        const messageId = uuidv4();
        const timestamp = new Date();
        const query = 'INSERT INTO messages (id, userId, username, content, timestamp) VALUES (?, ?, ?, ?, ?)';
        try {
            await client.execute(query, [messageId, userId, username, content, timestamp], { prepare: true });
            console.log('Message saved to database');

            io.emit('message', { id: messageId, userid:userId, username, content, timestamp });
        } catch (err) {
            console.error('Error saving message to database:', err);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

connectClient()
    .then(createSchema)
    .then(() => {
        const PORT = process.env.PORT || 5000;
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }).catch(err => console.error('Error setting up server:', err));
