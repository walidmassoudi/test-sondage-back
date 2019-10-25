var mongoose = require('mongoose')

var sujetSchema = new mongoose.Schema({
    titre: String,
    description: String,
    vote: String,
});

module.exports  = mongoose.model('sujet', sujetSchema);