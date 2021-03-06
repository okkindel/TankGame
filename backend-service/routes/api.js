var express = require('express');
var router = express.Router();
var ScoreEntry = require('../models/score_entry');

/* GET users listing. */
router.get('/high_scores', (req, res, next) => {
    var limit = 5;

    if(req.body.hasOwnProperty('limit')){
        limit = req.body.limit;
    }

    ScoreEntry.find({}).sort('-score').limit(limit).exec((err, result) =>{
        res.json(result);
    });
});

router.post('/post_score', (req, res, next) => {


    ScoreEntry.findOne({'nick': req.body.nickname}, function(err, score){
        if(err){
            res.json({status: 'fail'});
        }

        if(score === null){
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
        }
        else{
            if(score.score < req.body.score){
                score.score = req.body.score;
                score.save((err, product, numAffected) => {
                    if(err){
                        res.json({status: 'fail'});
                    }
                    else{
                        res.json({status: 'updated'});
                    }
                });
                
            }
            else{
                res.json({status: 'not updated'});
            }
        }
    });
    
});

module.exports = router;
