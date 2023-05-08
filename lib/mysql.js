const mysql = require('mysql');

// 設定連線
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'itdove_forum'
});

// 連接到資料庫
connection.connect((error) => {
    if (error) {
        console.error('An error occurred while connecting to the DB:', error);
    } else {
        console.log('Successfully connected to the DB.');
    }
});

module.exports = {
    connection
};