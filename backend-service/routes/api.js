var express = require('express');
var router = express.Router();
var ScoreEntry = require('../models/score_entry');
var MapEntry = require('../models/map_instance');

// Maps API
router.post('/post_map', (req, res, next) => {
    MapEntry.findOne({'round' : req.body.round, 'type' : req.body.type}, 
                    function(err, map){
                        if(map === null){
                            //We create new Map
                            var newMap = new MapEntry;
                            newMap.creator = req.body.creator;
                            newMap.type = req.body.type;
                            newMap.round = req.body.round;
                            newMap.map = req.body.map;

                            newMap.save(function(err, product, numAffected){
                                if(err){
                                    res.json({status: 'fail'});
                                }
                                else{
                                    res.json({status: 'ok'});
                                }
                            });
                        }
                        else{
                            
                            //Return that map laready exists
                            res.json({status : 'Map already exists'});

                        }
                    });
});

router.post('/update_map', (req, res, next) => {
    MapEntry.findOne({'round' : req.body.round, 'type' : req.body.type}, 
                    function(err, map){
                        if(!!map){
                           //We update old map
                           map.creator = req.body.creator;
                           map.type = req.body.type;
                           map.round = req.body.round;
                           map.map = req.body.map;
                           map.created = Date.now();

                           map.save(function(err, product, numAffected){
                               if(err){
                                   console.log(err);
                                   res.json({status: 'fail to update'});
                               }
                               else{
                                   res.json({status: 'updated'});
                               }
                           });
                        }
                        else{
                            res.json({status : 'map do not exist'});
                        }
                    });

});

router.post('/get_map', (req, res, next) => {
    //Method to get maps
    MapEntry.findOne({'round' : req.body.round, 'type' : req.body.type}, 
                    function(err, map){
                        if(map === null){
                            res.json({'status' : "Map do not exists!"});
                        }
                        else{
                            res.json(map);
                        }
                    });
});


/* Highscores API */
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
