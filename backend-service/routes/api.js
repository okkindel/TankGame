var express = require('express');
var router = express.Router();
var ScoreEntry = require('../models/score_entry');

/* GET users listing. */
router.get('/high_scores', (req, res, next) => {
    var highScores = [];
    
    ScoreEntry.find({}).sort('-score').exec((err, result) =>{
        res.json(result);
    });
});

router.post('/post_score', (req, res, next) => {
    var newEntry = new ScoreEntry;
    newEntry.nick = req.body.nickname;
    newEntry.score = req.body.score;

    newEntry.save((err, product, numAffected) => {
        if(err){
            res.json({status: 'fail'});
        }
        else{
            res.json({status: 'ok'});
        }
    });
    
});

module.exports = router;
