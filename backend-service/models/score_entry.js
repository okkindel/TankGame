var mongoose = require('mongoose');

var scoreEntrySchema = new mongoose.Schema({
    nick: String,
    score: Number
});


module.exports = mongoose.model('ScoreEntry', scoreEntrySchema);