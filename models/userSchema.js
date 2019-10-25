var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({ 
    firstname: String,
    lastname: String,
    username: {type: String, unique: true},
    password:String,
    SUJET:[{type: mongoose.Schema.Types.ObjectId, ref: 'sujet'}]
});

module.exports  = mongoose.model('user', userSchema);