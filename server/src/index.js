const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
        console.log('MongoDB Connected (Local)');
    } catch (err) {
        console.log('Local MongoDB not found, switching to In-Memory Database...');
        try {
            // Lazy load to avoid crash if not installed yet
            const { MongoMemoryServer } = require('mongodb-memory-server');
            const mongod = await MongoMemoryServer.create();
            const uri = mongod.getUri();
            await mongoose.connect(uri);
            console.log('MongoDB Connected (In-Memory) - Ready to use!');
            console.log('NOTE: Data will be reset when server restarts.');
        } catch (memErr) {
            console.error('MongoDB Connection Error:', memErr.message);
            console.error('ensure you have mongodb installed or mongodb-memory-server');
        }
    }
};

connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
