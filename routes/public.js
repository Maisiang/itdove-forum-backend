const express = require('express');
const router = express.Router();

const public = require('../controller/public');



router.get('/kanban'            , public.getKanban);    // 取得看板
router.get('/article/:kanbanID' , public.getArticle);   // 取得文章
router.post('/login'            , public.login);        // 用戶登入



/* GET index listing. */
router.get('/', (req, res, next) => {
    res.send('/public 運作中');
});

module.exports = router;