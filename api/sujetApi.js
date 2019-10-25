var express = require('express'); 
var router = express.Router();
var sujet = require('../models/sujetSchema');
var passport = require('passport');
//*** */fonction ajour un sujet dans la base
router.post('/AddSujet', passport.authenticate('bearer', { session: false }), function (req, res) { 
    var Sujet = new sujet(req.body)// instance sujet
    Sujet.save(function (err, sujet) {
        if (err) {
            res.send(err);
        }
        res.send(sujet)
    })
})

//*** */fonction supprimer un sujet dans la base
router.post('/DeleteSujet/:id', passport.authenticate('bearer', { session: false }), function (req, res) {  //remplace app.post dans mangodb
        sujet.findByIdAndDelete(req.params.id, function (err, result) {
        if (err) {
            res.send(err);
        }
        res.send(result)
    })
})

// ****fonction Modifier un sujet 
router.post('/ModifSujet/:id', passport.authenticate('bearer', { session: false }), function (req, res) {  //remplace app.post dans mangodb
    sujet.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, result) {
        if (err) {
            res.send(err);
        }
        res.send(result)
    })
})

// ****fonction get sujet
router.get('/GetOneSujet/:id', function (req, res) {  
    sujet.findById(req.params.id,function (err, sujet) {
        if (err) {
            res.send(err);
        }
        res.send(sujet)
    })
})


// ****fonction get liste sujet
router.get('/GetAllSujet', function (req, res) {
  var Sujet = new sujet(req.body)
    sujet.find({}, function (err, sujet) {
        if (err) {
            res.send(err);
        }
        res.send(sujet)
    })
})
module.exports = router;