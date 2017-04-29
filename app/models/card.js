var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CardSchema   = new Schema({
    id: Number,
    title: String,
    description: String,
    date: String,
    status: String
});

module.exports = mongoose.model('Card', CardSchema);
