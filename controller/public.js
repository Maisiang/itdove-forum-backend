const postgreSQL = require('../lib/postgreSQL');
const jwt = require('jsonwebtoken');


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
    if(request.cookies!=undefined){
        console.log("TOKEN: " ,request.cookies.token);
        jwt.verify(request.cookies.token, "test", (err, decoded) => {
            if (err) {
                console.log(err);
            } else
            console.log(decoded)
        });
    }

    console.log('用戶登入：',request.body);
    const token = jwt.sign(
        { 
            username: request.body.username 
        }, 
        "test"
    );
    // 將 JWT 儲存在 Cookie
    response.cookie('token', token, { httpOnly: false });
    response.json({ isSuccess: true });
}

// 錯誤處理
function Error(error, response){
    console.error('Error executing query: ' + error.stack);
    response.status(500).json({ error: 'Error executing query' });
    return false;
}