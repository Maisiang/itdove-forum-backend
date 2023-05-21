const express = require('express');
const router = express.Router();

//const public = require('../controller/user');







/* GET index listing. */
router.get('/', (req, res, next) => {
    res.send('/user 運作中');
});

module.exports = router;