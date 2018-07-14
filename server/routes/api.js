const express = require('express');
const router = express.Router();
const mongoUtil = require('../utils/mongoUtil');
const mongoose = require('mongoose');
const encryption = require('../utils/encryption.js');
const config = require('../config');
const ObjectID = require('mongodb').ObjectID;
const clientUtil = require('../utils/mongoUtil.js');
var crypto = require('crypto');

const Client = require('../Models/ClientModel.js');
const User = require('../Models/UserModel.js');
var db = mongoose.connection;

mongoose.connect('mongodb://localhost/srvcr').then(()=> console.log('MongoDB connected...')).catch(err => console.log(err));

db.on('error',function(err){
    console.log(err);
});

const sendError = (err,res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);    
};

let response = {
    status:200,
    data:[],
    message: null
};

router.get('/users',(req,res) =>{
        db.collection('users')
        .find()
        .toArray()
        .then((users) =>{
            response.data = users;
            res.json(response);
        })
        .catch((err) =>{
            sendError(err, res);
        });
});
router.post('/clients',(req,res)=>{
    var token = req.body.params.token;
    console.log("CLIENTS POST REQUEST");
        if(token != null && encryption.validateJWT(req.query.token, config.jwtSecret).exp > Math.floor(Date.now()/1000)){
            var client =  new Client({
                ownerID: encryption.validateJWT(token, config.jwtSecret).id,
                name: req.body.params.client.name,
                street: req.body.params.client.address,
                phoneNumber: req.body.params.client.phoneNumber,
                email: req.body.params.client.email,
                website: req.body.params.client.website,
                packageActive: req.body.params.client.packageActive,
                packageExpires: new Date(req.body.params.client.packageExpires),
                paymentDue: req.body.params.client.paymentDue
            });
            console.log(client.ownerID);
            client.save();
        }else{
            console.log("BAD TOKEN");
        };
});

router.get('/clients',(req,res) =>{
        console.log("INCOMING GET FOR CLIENTS: TOKEN: " + req.query.token);
        console.log("Date NOW: " +  Math.floor(Date.now()/1000));
        if (req.query.token != null && encryption.validateJWT(req.query.token, config.jwtSecret).exp > Math.floor(Date.now()/1000)){
            if(encryption.validateJWT(req.query.token, config.jwtSecret).exp > Math.floor(Date.now()/1000)){
                var tok = encryption.validateJWT(req.query.token, config.jwtSecret);
                console.log(tok.id);
                Client.find({'ownerID':tok.id}).then((clients) =>{
                    response.data = clients;
                    res.json(response);
                }).catch((err) =>{
                    console.log(err);
                });
            }else{
                console.log("BAD TOKEN OR EXPIRED TOKEN");
            };
        };
});

router.put('/clients',(req,res)=>{
    //console.log(req.body.params);
    if(req.query.token != null && encryption.validateJWT(req.query.token, config.jwtSecret).exp > Math.floor(Date.now()/1000)){
            //console.log(req.body.params.token);
        var tok = encryption.validateJWT(req.body.params.token, config.jwtSecret);
                //console.log(tok.id);
                // console.log(req.body.params.client._id);
            var client = {
                ownerID: req.body.params.client.ownerID,
                name: req.body.params.client.name,
                street: req.body.params.client.address,
                phoneNumber: req.body.params.client.phoneNumber,
                email: req.body.params.client.email,
                website: req.body.params.client.website,
                packageActive: req.body.params.client.packageActive,
                packageExpires:new Date(req.body.params.client.packageExpires),
                paymentDue: req.body.params.client.paymentDue
            };
            Client.findByIdAndUpdate(ObjectID(req.body.params.client._id),client,function(err,doc){
                if(err){
                    console.log(err);
                }
                console.log(doc);
            });
        }else{
            console.log("TOKEN EXPIRED");
        }
});

router.delete('/clients',(req,res)=>{
    console.log("INCOMING DELETE FOR CLIENTS ");
    if(req.query.token!=null && encryption.validateJWT(req.query.token, config.jwtSecret).exp > Math.floor(Date.now()/1000)){
        if(encryption.validateJWT(req.query.token, config.jwtSecret)){
            db.collection('clients')
            .deleteOne({'_id':ObjectID(req.query.client)});
        }
    }else{
        console.log("TOKEN EXPIRED");
    }
});

router.post('/register',(req,res) =>{
    console.log("test " + req.body.username);
    var userInfo = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        salt: null,
        passwordHash:null
    });
    
    User.findOne({'username':userInfo.username},function(err,doc){
        console.log(doc);
        if(err)
        {
            console.log(err);
        }
        else if(doc != null){
            console.log(doc.username + " BLIN");
            if(doc.username == userInfo.username)
             {
                 console.log("This Email or Username is already used");
                 res.send("Email is already in use!");
             }
        } else if (doc == null){
            console.log("No email found, proceed");
            passwordData = encryption.saltHashPassword(userInfo.password);
            userInfo.salt = passwordData.salt;
            userInfo.passwordHash = passwordData.passwordHash;
            console.log(passwordData.passwordHash + ' Salt: ' + passwordData.salt);
    
            passwordData2 = encryption.sha512(userInfo.password, userInfo.salt);
            userInfo.password = "This isn't the password you are looking for! *Jedi mind trick hand motion*"
            console.log(passwordData2.passwordHash);
    
            userInfo.save();

        }
    });
});

router.post('/login',(req,res)=>{
    var userInfo = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        salt: null,
        passwordHash:null
    });
    User.findOne({'username':userInfo.username},function(err,doc){
        if(err){
            console.log(err);
        }else if(doc == null){
            console.log("Username not found");
            res.status(300).send({redirect:"/register"});
        }else{
            var valid = encryption.validateHash(userInfo.password, doc.salt, doc.passwordHash);
            if(valid == true){
                jwtData = {
                    id: doc._id
                }
                token = encryption.generateJWT(jwtData, config.jwtSecret);
                //console.log(valid);
                res.status(200).send({username:userInfo.username, auth: true, token: token });
            }
            else{
                res.redirect();
            }
        }
    });
    console.log("Login attempt: " + userInfo.username);

});

module.exports = router;