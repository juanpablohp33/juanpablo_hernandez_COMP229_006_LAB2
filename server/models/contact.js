let mongoose = require('mongoose');

// create a model class
let contactModel = mongoose.Schema({
    first_name: String,
    last_name: String,
    address: String,
    description: String,
    email: String
}, {
    collection: "contact"
});

module.exports = mongoose.model('Contact', contactModel);