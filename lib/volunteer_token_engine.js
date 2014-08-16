/**
 * Created by Dominic on 30-Jul-2014.
 */
var mongoose = require('mongoose');

var tokenWriteService =  require('../services/token_write_service');

var VolunteerTokenInfo = require('../models/volunteertoken_info');

var Emitter = require('events').EventEmitter;
var util = require('util');
var assert = require('assert');

var VolunteerTokenResult = function(){
    var result = {
        success : false,
        message : null,
        volunteerToken : null
        };

    return result;

};

var VolunteerTokenGenerationEngine = function(){

    Emitter.call(this);
    var  continueWith = null;
    var self = this;

    var validateInfo = function(tokenInfo){

        if(!tokenInfo._id){
            tokenInfo.message = "Token identifier is required";
            self.emit('error', tokenInfo);
        }

       self.emit("volunteerInfo-validated", tokenInfo);
    };

    var removeAnyExistingToken = function(tokenInfo){
//        console.log(tokenInfo);
      tokenWriteService.removeVolunteerEmailToken({_volunteerId: tokenInfo._id},
            function (err) {
                if (err) {
                    tokenInfo.message = "Internal Server Error";
//                LogInternalServerError(err.toString());
                    self.emit('error', tokenInfo);
                }

                self.emit('create-token', tokenInfo);

        });
    };

    var createVolunteerToken =  function(tokenInfo) {

     tokenWriteService.createVolunteerEmailToken(tokenInfo, function(err, token){
            if (err) {
                tokenInfo.message = "Internal Server Error";
                self.emit('error', tokenInfo);
            }
            if (token) {
                tokenInfo.volunteerToken = token;
                self.emit('token-created', tokenInfo);
            }
        });
    };

    self.processVolunteerToken = function(volunteer, next){
        continueWith = next;
        var tokenInfo = new VolunteerTokenInfo(volunteer);
        self.emit("receive-volunteerInfo", tokenInfo);
    };

    var successful = function(tokenInfo){
        var tokenResult = new VolunteerTokenResult();
        tokenResult.volunteerToken = tokenInfo.volunteerToken;
        tokenResult.success = true;
        tokenResult.message = "Activation Token Generated Successfully";
        self.emit('volunteer-token-success', tokenResult);
        if(continueWith){
            continueWith(null, tokenResult);
        }

    };
    var unsuccessful = function(tokenInfo){
        var tokenResult = new VolunteerTokenResult();
        tokenResult.success = false;
        tokenResult.message = tokenInfo.message;
        self.emit('volunteer-token-failed', tokenResult);
        if(continueWith){
            continueWith(null, tokenResult);
        }
    };


    //events wiring

    self.on("receive-volunteerInfo", validateInfo);
    self.on("volunteerInfo-validated",removeAnyExistingToken);
    self.on("create-token",createVolunteerToken);
    self.on('token-created', successful);
    self.on('error', unsuccessful);


    return self;

};

util.inherits(VolunteerTokenGenerationEngine, Emitter);
module.exports = VolunteerTokenGenerationEngine;