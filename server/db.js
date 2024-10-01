
const fs = require('fs');
require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createConnection({
    user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host:process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync("./ca.pem").toString(),
  },
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + db.threadId);
});

module.exports = db;