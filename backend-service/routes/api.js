var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/high_scores', function(req, res, next) {
  res.send('respond with a resource');
});

reouter.post('/post_score', function(req, res, next){
    res.send('ok');
});

module.exports = router;
