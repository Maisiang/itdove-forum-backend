const express = require('express');
const router = express.Router();

//const public = require('../controller/admin');







/* GET index listing. */
router.get('/', (req, res, next) => {
    res.send('/admin 運作中');
});

module.exports = router;