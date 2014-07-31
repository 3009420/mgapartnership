/**
 * Created by Dominic on 30-Jul-2014.
 */
var mongoose = require('mongoose');

var PartnershipVerificationTokenSchema =  require('../schemas/partnershipverification_schema');

var VolunteerVerificationTokenSchema =  require('../schemas/verification_schema');


var PartnershipVerificationToken = mongoose.model('partnerverificationtokens', PartnerVerificationTokenSchema);

var VolunteerVerificationToken = mongoose.model('volunteerverificationtokens', VolunteerVerificationTokenSchema);

verificationToken.createVerificationToken(function (err, token) {
    if (err) return console.log("Couldn't create verification token", err);
    var message = {
        email: user.email,
        name: user.name,
        verifyURL: req.protocol + "://" + req.get('host') + "/verify/" + token};
    sendVerificationEmail(message, function (error, success) {
        if (error) {
            // not much point in attempting to send again, so we give up
            // will need to give the user a mechanism to resend verification
            console.error("Unable to send via postmark: " + error.message);
            return;
        }
        console.info("Sent to postmark for delivery")
    });
});


var TokenResult = function(){
    var result = {
        success : false,
        message : null,
        institutionToken : null
        };

    return result;

}

var VerificationTokenEngine = function(){

    Emitter.call(this);
    var  continueWith = null;
    var self = this;

    var validateInfo = function(tokenInfo){
        if(!tokenInfo.email){
            tokenInfo.message = "Email is required";
            self.emit('error', tokenInfo);
        }

        if(!tokenInfo._id){
            tokenInfo._id = "Token identifier is required";
            self.emit('error', tokenInfo);
        }


        if(!tokenInfo.name){
            tokenInfo._id = "Name is required";
            self.emit('error', tokenInfo);
        }

       self.emit("tokenInfo-validated", tokenInfo);
    };
    var createPartnerToken =  function(tokenInfo) {
        PartnershipVerificationToken.create({_institutionId: tokenInfo._id}, function (err, token) {
            if (err) {
                tokenInfo.message = "Internal Server Error";
                self.emit('error', tokenInfo);
            }
            if (token) {
                tokenInfo.institutionToken = token;
                self.emit('token-created', tokenInfo);
            }
        });
    }

    self.processPartnershipToken = function(institution, next){
        continueWith = next;
        var tokenInfo = new PartnerTokenInfo(institution);
        self.emit("receive-partnerInfo", tokenInfo);
    };


    var emailPartnerToken = function(tokenInfo){
        PartnershipVerificationToken.populate({_institutionId : institutionId},function(err, token){
            if(err){
                tokenInfo.message = "Internal Server Error";
                self.emit('error',tokenInfo)
            }
            if(token){
                var tokenResult = new tokenResult();
                tokenResult.institutionToken = token;
                self.emit('token-created', tokenResult);
            }
        });
    };

    var successful = function(tokenInfo){
        var tokenResult = new TokenResult();
        tokenResult.institutionToken = tokenInfo.institutionToken;
        tokenResult.success = true;
        tokenResult.message = "Activation Token Generated Successfully";
        self.emit('partnership-token-success', tokenResult);
        if(continueWith){
            continueWith(null, oprResult);
        }

    };
    var unsuccessful = function(tokenInfo){
        var tokenResult = new TokenResult();
        tokenResult.success = false;
        tokenResult.message = tokenInfo.message;
        self.emit('partnership-token-failed', tokenResult);
        if(continueWith){
            continueWith(null, oprResult);
        }
    };
    //events wiring
    self.on('error', unsuccessful);
    self.on("receive-partnerInfo", validateInfo);
    self.on("partnerInfo-validated",createPartnerToken);
    self.on('token-created', emailPartnerToken);
    self.on('token-sent', successful);

    return self;

};

module.exports = VerificationTokenEngine;