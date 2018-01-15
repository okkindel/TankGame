var mongoose = require('mongoose');
var mapTypes = ['original', 'community'];

var mapInstanceSchema = new mongoose.Schema({
    creator : String,
    type : {type : String, enum: mapTypes},
    round : Number,
    map : Object,
    created: { type: Date, default: Date.now() }
});


module.exports = mongoose.model('Map', mapInstanceSchema);