var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();//
var database = require('./database/db');
var passport = require('./passport');
var userApi = require('./api/userApi');// return les api de user
var sujetApi = require('./api/sujetApi');// return les api de sujet
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/USERS', userApi);
app.use('/SUJET', sujetApi);
app.listen(3000);