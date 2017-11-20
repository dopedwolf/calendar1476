var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: String, required: true},
    time: {type: String, required: true},
    venue: {type: String, required: true},
    address: {type: String, required: true},
    admission: {type: String, required: true},
    type: {type: String, required: true},
    url: {type: String, required: false},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Message', schema);
