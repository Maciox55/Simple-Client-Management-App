const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
var crypto = require('crypto');

module.exports = {
    connectToServer: function(callback){
        MongoClient.connect('mongodb://localhost:27017',(err, client) =>{
            _db = client.db('srvcr');
            console.log("Server Started");
            return callback(err);
        });

    },
    getDb: function(){
        return _db;
    }
};