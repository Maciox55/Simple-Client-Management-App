const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:String,
    email:String,
    password:String,
    salt:String,
    passwordHash:String
},{collection:'users',versionKey:false});

module.exports = User = mongoose.model('User', UserSchema,'users');