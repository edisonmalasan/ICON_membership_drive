const mongoose = require('mongoose');

const MONGOOSE_URI = "mongodb://mongodb:27017"

async function connectToDatabase() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGOOSE_URI, {
            dbName: "membership_drive",
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}
async function disconnectFromDatabase() {
    try {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error disconnecting from MongoDB:', error);
        throw error;
    }
}

// Handle MongoDB connection events
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});


module.exports = {
    connectToDatabase,
    disconnectFromDatabase,
};