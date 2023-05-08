const express = require('express');
const router = express.Router();

const public = require('../controller/public');


// 取得看板
router.get('/kanban', public.getKanban); 
// 取得文章
router.get('/article/:kanbanID', public.getArticle); 



/* GET index listing. */
router.get('/', (req, res, next) => {
    res.send('/public 運作中');
});

module.exports = router;