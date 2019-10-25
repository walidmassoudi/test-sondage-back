var passport = require('passport');
var BearerStrategy = require('passport-http-bearer');
var User = require('./models/userSchema');
var jwt = require('jsonwebtoken');
passport.use(new BearerStrategy(// verifire si user cnte ou nn
    function(token, done) {
        jwt.verify(token, 'secretKey', function(err, decoded) {
            User.findOne({ _id: decoded.user._id }, function (err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                return done(null, true);
              });
        })
      
    }
));