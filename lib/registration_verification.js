/**
 * Created by Dominic on 28-Jul-2014.
 */

var Emitter = require('events').EventEmitter;
var util = require('util');
var assert = require('assert');

var PartnershipVerificationResult = function(){
    var result = {
        success:false,
        message:null,
        verificationStatus : "failed"
    };

    return result;

};

var RegistrationVerification  = function(args){
    Emitter.call(this);
    var  continueWith = null;
    var self = this;


    self.partnershipEmailVerification = function(verificationTokenModel, next) {
        verificationTokenModel.findOne({token: token}, function (err, doc){
            if (err) return done(err);
            userModel.findOne({_id: doc._userId}, function (err, user) {
                if (err) return done(err);
                user["verified"] = true;
                user.save(function(err) {
                    done(err);
                })
            })
        })
    };

    self.volunteerEmailVerification = function(verificationTokenModel, next) {
        verificationTokenModel.findOne({token: token}, function (err, doc){
            if (err) return done(err);
            userModel.findOne({_id: doc._userId}, function (err, user) {
                if (err) return done(err);
                user["verified"] = true;
                user.save(function(err) {
                    done(err);
                })
            })
        })
    };


    self.verifyContactNos = function(args, next){

    };
    //event wiring
    self.on("verification-success", verificationSuccess);
    self.on("verification-failed", verificationFailed);


    return self;

};