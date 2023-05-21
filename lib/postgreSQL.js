const { Client } = require('pg');

// 設定連線
const client = new Client({
    host: process.env.PG_HOST,
    port: 5432,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: 'itdove'
});
const schema = 'forum';

// 連接到資料庫
async function startSQL(){
    await client.connect()
    .then(async() => {
        console.log('成功連接到 PostgreSQL, Schema:'+ schema);
        // 設定 Schema 為 forum
        return client.query('SET search_path TO ' + schema);
    })
    .catch(error => {
        console.error('資料庫連接失敗!!', error);
    });
}

module.exports = {
    client,
    startSQL
};