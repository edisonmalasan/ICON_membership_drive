const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const qs = require('qs')

const {connectToDatabase, disconnectFromDatabase} = require('./v2/utils/mongoUtil.js')

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

try {
  connectToDatabase();
  // Start server
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Admin panel: http://localhost:${PORT}/admin`);
    console.log(`Student panel: http://localhost:${PORT}/student`);
  });
} catch (error) {
  disconnectFromDatabase();
  console.error('Error starting server:', error);
}
