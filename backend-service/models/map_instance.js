var mongoose = require('mongoose');

var mapInstanceSchema = new mongoose.Schema({
    creator : String,
    type : String,
    round : Number,
    map : Object,
    created: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Map', mapInstanceSchema);