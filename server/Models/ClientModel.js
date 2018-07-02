const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
    ownerID:String,
    name:String,
    street:String,
    phoneNumber:String,
    email:String,
    website:String,
    packageActive:Boolean,
    packageExpires:Date,
    paymentDue:Number
},{collection:'clients'});

module.exports = Client = mongoose.model('client', ClientSchema,"clients");