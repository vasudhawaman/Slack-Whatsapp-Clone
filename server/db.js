// const mongoose = require('mongoose');

// const mongoURI = 'mongodb://localhost:27017/talkpal';

// const connectToMongo = () => {
//     mongoose.connect(mongoURI)
//         .then(() => {
//             console.log("Connected to MongoDB successfully");
//         })
//         .catch((err) => {
//             console.error("Error connecting to MongoDB:", err);
//         });
// };

// module.exports = connectToMongo;


require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'KrishPathak25',
    database: 'whatsapp'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + db.threadId);
});

module.exports = db;