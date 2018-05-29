const crypto = require('crypto');
const mongoUtil = require('./mongoUtil');
const jwt = require('jsonwebtoken');

module.exports={
    saltHashPassword: function(userpassword){
        var salt = this.genRandomString(16);
        var passwordData = this.sha512(userpassword, salt);
        return passwordData;

    },
    genRandomString: function(length){
        return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0,length);
    },
    sha512: function(password, salt){
        var hash = crypto.createHmac('sha512',salt);
        hash.update(password);
        var value = hash.digest('hex');
        return {
            salt: salt,
            passwordHash: value
        }
    },
    validateHash: function(userpassword, salt, passwordHash){
        var passwordValid = false;
        var testHash = this.sha512(userpassword, salt);
        if (testHash.passwordHash != passwordHash){
            return passwordValid = false;
        }else{
            console.log("VALIDATING HASH: "+ testHash.passwordHash);
            return passwordValid = true;

        }

    },
    generateJWT: function(user, secret){
        var newToken = jwt.sign(user,secret,{expiresIn:'1h'});
        console.log(newToken);
        return newToken;
    },
    validateJWT: function(token, secret){
        var decoded = jwt.verify(token, secret);
        return decoded;

    }

}




