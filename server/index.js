const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const qs = require('qs')

const {connectToDatabase, disconnectFromDatabase} = require('./v2/utils/mongoUtil.js')
const { startBackupScheduler, stopBackupScheduler } = require('./v2/utils/cronUtil.js')
const { performBackup } = require('./v2/utils/backupUtil.js');

//import v2 api
const v2Routes = require('./v2/v2.js');

const app = express();
const PORT = process.env.PORT || 3000;

//Environment variable config
dotenv.config({path:'./.env'})

// Middleware
app.use(cors());
app.use(express.json());

//Override default query parsing to use qs
app.set("query parser", str => qs.parse(str));

app.use('/api/v2', v2Routes);

let backupTask;

try {
  // Connect to database first
  connectToDatabase().then(() => {
    console.log('Database connection established');
    
    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Admin panel: http://localhost:${PORT}/admin`);
      console.log(`Student panel: http://localhost:${PORT}/student`);
    });

    // Wait a moment for everything to be ready, then run initial backup
    setTimeout(() => {
      performBackup().then((backupPath) => {
        console.log(`Initial backup completed: ${backupPath}`);
      }).catch((error) => {
        console.error('Initial backup failed:', error);
      });

      // Start backup scheduler
      backupTask = startBackupScheduler();
    }, 2000); // Wait 2 seconds for everything to settle
    
  }).catch((error) => {
    console.error('Failed to connect to database:', error);
    process.exit(1);
  });
  
} catch (error) {
  console.error('Error starting server:', error);
  process.exit(1);
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down gracefully...');
  stopBackupScheduler(backupTask);
  await disconnectFromDatabase();
  console.log('Server shutdown complete');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\nShutting down gracefully...');
  stopBackupScheduler(backupTask);
  await disconnectFromDatabase();
  console.log('Server shutdown complete');
  process.exit(0);
});