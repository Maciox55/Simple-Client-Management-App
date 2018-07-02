const express = require('express');
const router = express.Router();
const mongoUtil = require('../utils/mongoUtil');
const mongoose = require('mongoose');
const encryption = require('../utils/encryption.js');
const config = require('../config');
const ObjectID = require('mongodb').ObjectID;
const clientUtil = require('../utils/mongoUtil.js');
//const db = require("../config").mongoURI;
var crypto = require('crypto');

const Client = require('../Models/ClientModel.js');
const User = require('../Models/UserModel.js');
var db = mongoose.connection;
// mongoUtil.connectToServer(function(err){
//     if(err)
//     {
//         console.log(err);
//     }
//     db = mongoUtil.getDb();
// });

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
    if(token != null){
        if(encryption.validateJWT(token,config.jwtSecret)){
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

    };
});


router.get('/clients',(req,res) =>{
        console.log("INCOMING GET FOR CLIENTS: TOKEN: " + req.query.token);
        dateNow = new Date();
        if (req.query.token != null){
            if(encryption.validateJWT(req.query.token, config.jwtSecret) || !(encryption.validateJWT(req.query.token, config.jwtSecret).exp)>dateNow.getTime()){
                var tok = encryption.validateJWT(req.query.token, config.jwtSecret);
                console.log(tok.id);
                Client.find({'ownerID':tok.id}).then((clients) =>{
                    response.data = clients;
                    res.json(response);
                }).catch((err) =>{
                    console.log(err);
                });

                // db.collection('clients')
                // .find({'ownerID':tok.id})
                // .toArray()
                // .then((clients) =>{
                //     response.data = clients;
                //     res.json(response);
                // })
                // .catch((err) =>{
                //     sendError(err, res);
                // });
            }else{
                console.log("BAD TOKEN");
            };
        };
});

router.put('/clients',(req,res)=>{
    //console.log(req.body.params);
    if(req.body.params.token != null){
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


            // db.collection('clients').updateOne({'_id':ObjectID(req.body.params.client._id)},{$set:client},function(err){
            //     if(err){
            //         console.log(req.body.params.client._id);
            //     }
            // });
    };
});

router.delete('/clients',(req,res)=>{
    console.log("INCOMING DELETE FOR CLIENTS ");
    if(req.query.token!=null){
        if(encryption.validateJWT(req.query.token, config.jwtSecret)){
            db.collection('clients')
            .deleteOne({'_id':ObjectID(req.query.client)});
        }
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
    
    




    // var doc =db.collection('users')
    // .findOne({"email" : userInfo.email},function(err,call, callback){
    //     if(err){
    //         console.log(err);
    //     } else if(call != null){
    //         if(call.email == userInfo.email)
    //         {
    //             //console.log(call.email + ' '+ userInfo.email);
    //             console.log("This Email or Username is already used");
    //             res.send("Email is already in use!");
    //         }
    //     } else if(call == null){
            
    //         console.log("No email found, proceed");
    //         passwordData = encryption.saltHashPassword(userInfo.password);
    //         userInfo.salt = passwordData.salt;
    //         userInfo.passwordHash = passwordData.passwordHash;
    //         console.log(passwordData.passwordHash + ' Salt: ' + passwordData.salt);


    //         passwordData2 = encryption.sha512(userInfo.password, userInfo.salt);
    //         userInfo.password = "This isn't the password you are looking for! *Jedi mind trick hand motion*"
    //         console.log(passwordData2.passwordHash);

    //         db.collection('users').insert(userInfo);
    //     }
    // });
    // console.log(userInfo);
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
                console.log(valid);
                res.status(200).send({ auth: true, token: token });
            }
            else{
                res.redirect();
            }
        }
    });



    // db.collection('users').findOne({"username": userInfo.username}, function(err,call){
    //     if(err){
    //         console.log(err);
    //     }else if(call == null){
    //         console.log("Username not found");
    //         res.status(300).send({redirect:"/register"});
    //     } else{
    //         var valid = encryption.validateHash(userInfo.password, call.salt, call.passwordHash);

    //         if(valid == true){
    //             jwtData = {
    //                 id: call._id
    //             }
    //             token = encryption.generateJWT(jwtData, config.jwtSecret);
    //             console.log(valid);
    //             res.status(200).send({ auth: true, token: token });
    //         }else{
    //             res.redirect();
    //         }
            
    //         //console.log("Registered user found" + userInfo );
    //         //console.log("Password valid: " + valid);
            
    //     }
    // });


    console.log("login attempt " + userInfo.username);

});

module.exports = router;