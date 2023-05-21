const jwt       = require('jsonwebtoken');
const bcrypt    = require('bcrypt');

const postgreSQL    = require('../lib/postgreSQL');
const common        = require('../lib/common');


// 取得看板
exports.getKanban = async (request,response) => {
    const sql = 'SELECT * FROM "KANBAN"';
    const result = await postgreSQL.client.query(sql);
    response.json(result.rows);
}
// 取得文章
exports.getArticle = async (request,response) => {
    let params = [];
    let sql = 'SELECT "ARTICLE".* \
                FROM  "ARTICLE", "KANBAN" \
                WHERE "ARTICLE".KANBAN_ID = "KANBAN".KANBAN_ID ';
    // 非所有看板，則篩選文章
    params.push(request.query.page * 10);
    if(request.params.kanbanID != "all"){
        sql += 'AND "KANBAN".NAME_EN = $2 ';
        params.push(request.params.kanbanID);
    }
    sql += 'LIMIT 10 OFFSET $1'
    const result = await postgreSQL.client.query(sql, params);
    response.json(result.rows);
}

// 用戶登入
exports.login = async (request,response) => {
    // 帳號密碼驗證
    const sql = 'SELECT * FROM "USER" WHERE USERNAME = $1';
    const result = await postgreSQL.client.query(sql,[request.body.username]);
    if(result.rows.length > 0){
        bcrypt.compare(request.body.password, result.rows[0].password, function(error, compareResult) {
            if (error) {
                Error(error,response);
            } else if (compareResult) {
                // 產生 Token
                const token = jwt.sign(
                    { username: result.rows[0].username }, 
                    common.secretKey
                );
                // 將 JWT 儲存在 Cookie
                response.cookie('token', token, { httpOnly: true });
                response.json({ isSuccess: true });
                return;
            } else {
                response.json({ isSuccess: false });
            }
        });
    } else {
        response.json({ isSuccess: false });
    }
}

// 用戶註冊
exports.register = async (request,response) => {
    // 檢查帳號或信箱是否重複
    let sql = 'SELECT * FROM "USER" WHERE USERNAME = $1 OR EMAIL = $2'
    let params = [
        request.body.username,
        request.body.email,
    ];
    const result = await postgreSQL.client.query(sql,params);
    if(result.rows.length > 0){
        response.json({ isSuccess: false });
    } else {
        // 將密碼加密
        bcrypt.hash(request.body.password, common.saltRounds, async function(error, hash) {
            if (error) {
                Error(error,response);
            } else {
                // 新增用戶到資料庫
                sql = 'INSERT INTO "USER" (USERNAME, PASSWORD, EMAIL) VALUES ($1, $2, $3)';
                params = [
                    request.body.username,
                    hash,
                    request.body.email
                ];
                await postgreSQL.client.query(sql,params)
                response.json({ isSuccess: true });
            }
        });
    }
}

// 錯誤處理
function Error(error, response){
    console.error('Error executing query: ' + error.stack);
    response.status(500).json({ error: 'Error executing query' });
    return false;
}