var express = require('express'); //server
var router = express.Router();//router contient (get + post)
var User = require('../models/userSchema');
var bcrypt = require('bcrypt');// crypter password
var jwt = require('jsonwebtoken');

//***register****
router.post('/register', function (req, res) {
  var user = new User(req.body)
   user.password =  bcrypt.hashSync(req.body.password, 10);
     user.save( function(err, user) {
        if (err) {
            res.send(err);
        }
        res.send(user)
     });
    
});


//***login***
router.post('/login', function (req, res) {  //remplace app.post dans mangodb
    User.findOne({ username: req.body.username }, function (err, user) {
        if (user) {
            if (bcrypt.compareSync( req.body.password ,user.password)) {
                jwt.sign({user: user}, 'secretKey', function(err, token) {
                    res.send({access_token: token, success: true});
                });
            }
            else { 
                res.send("password incorrect")
            }
        }
        else{
                 res.send("username incorrect"); 
        }
        
    })
})

// ****fonction get user avec son sujet
router.get('/GetOneUser/:id', function (req, res) {  //remplace app.post dans mangodb
    var user = new User(req.body)// instance user
    User.findById(req.params.id).populate('SUJET').exec(function (err, user) {
        if (err) {
            res.send(err);
        }
        res.send(user)
    })
})


// ****fonction get liste  user 
router.get('/GetAllUser', function (req, res) {  //remplace app.post dans mangodb
    var user = new User(req.body)
    User.find({}, function (err, user) {
        if (err) {
            res.send(err);
        }
        res.send(user)
    })
})

// ****fonction Modifier un table user 
router.post('/ModifUser/:id', function (req, res) {  //remplace app.post dans mangodb
    var user = new User(req.body)// instance user
    User.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, result) {
        if (err) {
            res.send(err);
        }
        res.send(result)
    })
})
module.exports = router;