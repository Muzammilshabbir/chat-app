const { Client } = require('cassandra-driver');

const client = new Client({
    contactPoints: ['127.0.0.1'], // Replace with your Cassandra nodes
    localDataCenter: 'datacenter1', // Replace with your datacenter name
    // keyspace: 'chatapp' // Your keyspace name
});

// Function to connect to Cassandra
async function connectClient() {
    try {
        await client.connect();
        console.log('Connected to Cassandra cluster');
    } catch (err) {
        console.error('Error connecting to Cassandra cluster', err);
        throw err; // Ensure to throw the error to handle it appropriately
    }
}

async function createSchema() {
    try {
        await client.connect();

        // Create keyspace
        await client.execute(`CREATE KEYSPACE IF NOT EXISTS chatapp 
                               WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1}`);

        console.log('Keyspace chatapp created (if not existed)');

        // Use keyspace
        await client.execute('USE chatapp');

        // Create tables
        await client.execute(`CREATE TABLE IF NOT EXISTS users (
                                id UUID,
                                username TEXT PRIMARY KEY,
                                password TEXT
                            )`);

        console.log('Table users created (if not existed)');

        await client.execute(`CREATE TABLE IF NOT EXISTS messages (
                                id UUID PRIMARY KEY,
                                userid UUID,
                                username TEXT,
                                content TEXT,
                                timestamp TIMESTAMP
                            )`);

        console.log('Table messages created (if not existed)');

    } catch (err) {
        console.error('Error creating schema', err);
    } finally {
        // await client.shutdown();
        console.log('Connection closed');
    }
}

module.exports = { client, connectClient, createSchema };
