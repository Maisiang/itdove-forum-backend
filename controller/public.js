const postgreSQL = require('../lib/postgreSQL');

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

// 錯誤處理
function Error(error, response){
    console.error('Error executing query: ' + error.stack);
    response.status(500).json({ error: 'Error executing query' });
    return false;
}