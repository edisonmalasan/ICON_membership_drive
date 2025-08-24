const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const BACKUP_DIR = path.join(__dirname, '../../../backups');

async function createBackup() {
    try {
        // Use the existing mongoose connection
        if (mongoose.connection.readyState !== 1) {
            throw new Error('MongoDB connection is not ready. Current state: ' + mongoose.connection.readyState);
        }
        
        const db = mongoose.connection.db;
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        
        console.log('Using existing MongoDB connection for backup');
        
        // Ensure backup directory exists
        if (!fs.existsSync(BACKUP_DIR)) {
            fs.mkdirSync(BACKUP_DIR, { recursive: true });
            console.log(`Created backup directory: ${BACKUP_DIR}`);
        }
        
        // Get all collections
        const collections = await db.listCollections().toArray();
        console.log(`Found ${collections.length} collections to backup`);
        
        // Create both formats: combined and individual files
        const combinedBackup = {};
        
        // Export each collection
        for (const collectionInfo of collections) {
            const collectionName = collectionInfo.name;
            console.log(`Backing up collection: ${collectionName}`);
            
            const collection = db.collection(collectionName);
            // Get raw documents without Mongoose processing
            const documents = await collection.find({}).toArray();
            
            // Clean up documents for import (remove MongoDB internal fields if desired)
            const cleanDocuments = documents.map(doc => {
                // Keep _id but remove __v for cleaner imports
                const { __v, ...cleanDoc } = doc;
                return cleanDoc;
            });
            
            combinedBackup[collectionName] = cleanDocuments;
            
            // Create individual collection files for easy import
            const collectionFile = path.join(BACKUP_DIR, `${collectionName}_${timestamp}.json`);
            fs.writeFileSync(collectionFile, JSON.stringify(cleanDocuments, null, 2));
            
            console.log(`  - Backed up ${documents.length} documents from ${collectionName}`);
            console.log(`  - Individual file: ${collectionFile}`);
        }
        
        // Write combined backup file
        const combinedBackupFile = path.join(BACKUP_DIR, `backup_${timestamp}.json`);
        fs.writeFileSync(combinedBackupFile, JSON.stringify(combinedBackup, null, 2));
        
        // Create JSONL files for mongoimport compatibility
        for (const [collectionName, documents] of Object.entries(combinedBackup)) {
            if (documents.length > 0) {
                const jsonlFile = path.join(BACKUP_DIR, `${collectionName}_${timestamp}.jsonl`);
                const jsonlContent = documents.map(doc => JSON.stringify(doc)).join('\n');
                fs.writeFileSync(jsonlFile, jsonlContent);
                console.log(`  - JSONL file: ${jsonlFile}`);
            }
        }
        
        const fileSize = (fs.statSync(combinedBackupFile).size / 1024 / 1024).toFixed(2);
        console.log(`✅ Backup completed: ${combinedBackupFile} (${fileSize} MB)`);
        
        return {
            combinedFile: combinedBackupFile,
            individualFiles: Object.keys(combinedBackup).map(name => 
                path.join(BACKUP_DIR, `${name}_${timestamp}.json`)
            ),
            jsonlFiles: Object.keys(combinedBackup).map(name => 
                path.join(BACKUP_DIR, `${name}_${timestamp}.jsonl`)
            )
        };
        
    } catch (error) {
        console.error('❌ Backup failed:', error);
        throw error;
    }
}

async function cleanOldBackups(retentionDays = 7) {
    try {
        if (!fs.existsSync(BACKUP_DIR)) {
            console.log('No backup directory found, skipping cleanup');
            return;
        }
        
        const files = fs.readdirSync(BACKUP_DIR);
        const now = Date.now();
        const retentionMs = retentionDays * 24 * 60 * 60 * 1000;
        let deletedCount = 0;
        
        for (const file of files) {
            // Clean up all backup formats
            if ((file.startsWith('backup_') || file.startsWith('members_') || file.startsWith('payments_')) && 
                (file.endsWith('.json') || file.endsWith('.jsonl'))) {
                const filePath = path.join(BACKUP_DIR, file);
                const stats = fs.statSync(filePath);
                
                if (now - stats.mtime.getTime() > retentionMs) {
                    fs.unlinkSync(filePath);
                    console.log(`Deleted old backup: ${file}`);
                    deletedCount++;
                }
            }
        }
        
        if (deletedCount === 0) {
            console.log('No old backups to clean up');
        } else {
            console.log(`Cleaned up ${deletedCount} old backup(s)`);
        }
        
    } catch (error) {
        console.error('Error cleaning old backups:', error);
    }
}

// Add restore function for easy data restoration
async function restoreBackup(backupFilePath) {
    try {
        if (mongoose.connection.readyState !== 1) {
            throw new Error('MongoDB connection is not ready');
        }
        
        console.log(`Restoring backup from: ${backupFilePath}`);
        
        const backupData = JSON.parse(fs.readFileSync(backupFilePath, 'utf8'));
        const db = mongoose.connection.db;
        
        for (const [collectionName, documents] of Object.entries(backupData)) {
            if (Array.isArray(documents) && documents.length > 0) {
                console.log(`Restoring ${documents.length} documents to ${collectionName}`);
                
                const collection = db.collection(collectionName);
                // Clear existing data (optional - remove this line if you want to append)
                await collection.deleteMany({});
                // Insert backup data
                await collection.insertMany(documents);
                
                console.log(`✅ Restored ${collectionName}`);
            }
        }
        
        console.log('✅ Backup restored successfully');
        return true;
        
    } catch (error) {
        console.error('❌ Restore failed:', error);
        throw error;
    }
}

async function performBackup() {
    try {
        console.log(`[${new Date().toISOString()}] Starting backup process...`);
        const backupResult = await createBackup();
        await cleanOldBackups(7);
        console.log(`[${new Date().toISOString()}] Backup process completed successfully`);
        return backupResult.combinedFile; // Return main file path for compatibility
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Backup process failed:`, error);
        throw error;
    }
}

module.exports = { 
    createBackup,
    cleanOldBackups,
    performBackup,
    restoreBackup
};