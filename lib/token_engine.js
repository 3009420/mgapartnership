/**
 * Created by Dominic on 30-Jul-2014.
 */
var mongoose = require('mongoose');

var tokenWriteService =  require('../services/token_write_service');

var PartnerTokenInfo = require('../models/partnertoken_info');

var Emitter = require('events').EventEmitter;
var util = require('util');
var assert = require('assert');

var TokenResult = function(){
    var result = {
        success : false,
        message : null,
        institutionToken : null
        };

    return result;

};

var PartnerTokenGenerationEngine = function(){

    Emitter.call(this);
    var  continueWith = null;
    var self = this;

    var validateInfo = function(tokenInfo){

        if(!tokenInfo._id){
            tokenInfo.message = "Token identifier is required";
            self.emit('error', tokenInfo);
        }
       self.emit("partnerInfo-validated", tokenInfo);
    };

    var removeAnyExistingToken = function(tokenInfo){
        tokenWriteService.removePartnerEmailToken({_institutionId: tokenInfo._id},
            function (err) {
                if (err) {
                    tokenInfo.message = "Internal Server Error";
//                LogInternalServerError(err.toString());
                    self.emit('error', tokenInfo);
                }

                self.emit('create-token', tokenInfo);

        });
    };

    var createPartnerToken =  function(tokenInfo) {

       tokenWriteService.createPartnerEmailToken(tokenInfo, function (err, token) {
            if (err) {
                tokenInfo.message = "Internal Server Error";
                self.emit('error', tokenInfo);
            }
            if (token) {
                tokenInfo.institutionToken = token;
                self.emit('token-created', tokenInfo);
            }
        });
    };

    self.processPartnershipToken = function(institution, next){
        continueWith = next;
        var tokenInfo = new PartnerTokenInfo(institution);
        self.emit("receive-partnerInfo", tokenInfo);
    };

    var successful = function(tokenInfo){
        var tokenResult = new TokenResult();
        tokenResult.institutionToken = tokenInfo.institutionToken;
        tokenResult.success = true;
        tokenResult.message = "Activation Token Generated Successfully";
        self.emit('partnership-token-success', tokenResult);
        if(continueWith){
            continueWith(null, tokenResult);
        }

    };
    var unsuccessful = function(tokenInfo){
        var tokenResult = new TokenResult();
        tokenResult.success = false;
        tokenResult.message = tokenInfo.message;
        self.emit('partnership-token-failed', tokenResult);
        if(continueWith){
            continueWith(null, tokenResult);
        }
    };


    //events wiring

    self.on("receive-partnerInfo", validateInfo);
    self.on("partnerInfo-validated",removeAnyExistingToken);
    self.on("create-token",createPartnerToken);
    self.on('token-created', successful);
    self.on('error', unsuccessful);


    return self;

};

util.inherits(PartnerTokenGenerationEngine, Emitter);
module.exports = PartnerTokenGenerationEngine;