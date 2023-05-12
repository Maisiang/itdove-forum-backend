const mysql = require('../lib/mysql');

// 取得看板
exports.getKanban = (request,response) => {
    const sql = 'SELECT * FROM KANBAN';
    mysql.connection.query(sql, (error, results) => {
        /*if (error) {return Error(error, response);}*/
        response.json(results);
    });
}
// 取得文章
exports.getArticle = (request,response) => {
    console.log(request.query.page);
    let params = [];
    let sql = "SELECT ARTICLE.* \
                FROM  ARTICLE, KANBAN \
                WHERE ARTICLE.KANBAN_ID = KANBAN.KANBAN_ID ";
    if(request.params.kanbanID != "all"){
        sql += "AND KANBAN.NAME_EN = ? ";
        params.push(request.params.kanbanID);
    }
    sql += "LIMIT " + request.query.page * 10 + ", 10";
    mysql.connection.query(sql, params, (error, results) => {
        console.log('結果：',results);
        response.json(results);
    });
}

// 錯誤處理
function Error(error, response){
    console.error('Error executing query: ' + error.stack);
    response.status(500).json({ error: 'Error executing query' });
    return false;
}