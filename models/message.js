var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    month: {type: Mixed, required: true},
    day: {type: Mixed, required: true},
    time: {type: String, required: true},
    venue: {type: String, required: true},
    address: {type: String, required: true},
    admission: {type: String, required: false},
    type: {type: String, required: true},
    url: {type: String, required: false},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Message', schema);
