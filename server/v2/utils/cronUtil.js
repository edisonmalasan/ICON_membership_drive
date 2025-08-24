const cron = require('node-cron');
const { performBackup } = require('./backupUtil.js');

function startBackupScheduler() {
    // Schedule backup every 1 hour (0 */1 * * *)
    const task = cron.schedule('0 */1 * * *', async () => {
        console.log(`[${new Date().toISOString()}] Starting scheduled database backup...`);
        try {
            const backupPath = await performBackup();
            console.log(`[${new Date().toISOString()}] ✅ Scheduled backup completed: ${backupPath}`);
        } catch (error) {
            console.error(`[${new Date().toISOString()}] ❌ Scheduled backup failed:`, error);
        }
    }, {
        scheduled: false,
        timezone: "Asia/Manila" // Adjust to your timezone
    });

    // Start the task
    task.start();
    console.log('📅 Backup scheduler started - running every 1 hour');

    return task;
}

function stopBackupScheduler(task) {
    if (task) {
        task.stop();
        console.log('📅 Backup scheduler stopped');
    }
}

// Manual backup endpoint function
async function triggerManualBackup() {
    try {
        console.log(`[${new Date().toISOString()}] Manual backup triggered...`);
        const backupPath = await performBackup();
        return { success: true, backupPath, timestamp: new Date().toISOString() };
    } catch (error) {
        console.error(`[${new Date().toISOString()}] ❌ Manual backup failed:`, error);
        return { success: false, error: error.message, timestamp: new Date().toISOString() };
    }
}

// Alternative schedules for different needs
function createCustomScheduler(cronExpression, description) {
    const task = cron.schedule(cronExpression, async () => {
        console.log(`[${new Date().toISOString()}] Starting ${description}...`);
        try {
            const backupPath = await performBackup();
            console.log(`[${new Date().toISOString()}] ✅ ${description} completed: ${backupPath}`);
        } catch (error) {
            console.error(`[${new Date().toISOString()}] ❌ ${description} failed:`, error);
        }
    }, {
        scheduled: false,
        timezone: "America/New_York"
    });
    
    return task;
}

// Predefined schedule options
const scheduleOptions = {
    hourly: '0 * * * *',        // Every hour
    every3hours: '0 */3 * * *', // Every 3 hours
    every6hours: '0 */6 * * *', // Every 6 hours
    daily: '0 2 * * *',         // Daily at 2 AM
    weekly: '0 2 * * 0',        // Weekly on Sunday at 2 AM
};

module.exports = {
    startBackupScheduler,
    stopBackupScheduler,
    triggerManualBackup,
    createCustomScheduler,
    scheduleOptions
};