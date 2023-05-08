const mysql = require('../lib/mysql');

// 取得看板
exports.getKanban = (request,response) => {
    const sql = 'SELECT * FROM KANBAN';
    mysql.connection.query(sql, (error, results) => {
        /*if (error) {
            return Error(error, response);
        }*/
        response.json(results);
    });
}
// 取得文章
exports.getArticle = (request,response) => {
    const sql = 'SELECT * FROM ARTICLE WHERE KANBAN_ID = ?';
    mysql.connection.query(sql, [request.params.kanbanID], (error, results) => {
        /*if (error) {
            return Error(error, response);
        }*/
        response.json(results);
    });
}

// 錯誤處理
function Error(error, response){
    console.error('Error executing query: ' + error.stack);
    response.status(500).json({ error: 'Error executing query' });
    return false;
}