/**
 * Created by Dominic on 28-Jul-2014.
 */

var Emitter = require('events').EventEmitter;
var util = require('util');
var assert = require('assert');


var tokenWriteService =  require('../services/token_write_service');
//var tokenReadService =  require('../services/token_read_service');
var PartnerPhoneInfo = require('../models/partner_phone_info');


var PhoneCodeGenerationResult = function(){
    var result = {
        success:false,
        message:null,
        code: null
    };

    return result;

};

var PhoneCodeGeneration  = function(args){
    Emitter.call(this);
    var  continueWith = null;
    var self = this;


    var validatePartnerPhoneInfo = function(phoneInfo) {
        if(!phoneInfo._id){
            phoneInfo.message = "Partner Identifier Required";
            self.emit('invalid-phone-info', phoneInfo);
        }

        if(!phoneInfo.contact_number){
            phoneInfo.message = "Phone number is Required";
            self.emit('invalid-phone-info', phoneInfo);
        }

        self.emit('valid-phone-info', phoneInfo);
    };

    var validateVolunteerPhoneInfo = function(phoneInfo) {
        if(!phoneInfo._id){
            phoneInfo.message = "Partner Identifier Required";
            self.emit('invalid-phone-info', phoneInfo);
        }

        if(!phoneInfo.contact_number){
            phoneInfo.message = "Phone number is Required";
            self.emit('invalid-phone-info', phoneInfo);
        }

        self.emit('valid-volunteer-phone-info', phoneInfo);
    };

    var removePartnerPhoneCode = function(tokenInfo){
        tokenWriteService.removePartnerPhoneCode(tokenInfo,
            function (err) {
                if (err) {

                    tokenInfo.message = "Internal Server Error";
                    self.emit('error', tokenInfo);
                }

                self.emit('create-partner-phonecode', tokenInfo);

            });
    };


    var removeVolunteerPhoneCode = function(tokenInfo){
        tokenWriteService.removeVolunteerPhoneCode(tokenInfo,
            function (err) {
                if (err) {
                    tokenInfo.message = "Internal Server Error";
                    self.emit('error', tokenInfo);
                }

                self.emit('create-volunteer-phonecode', tokenInfo);

            });
    };
    var createPartnerPhoneCode = function(phoneInfo){

        tokenWriteService.createPartnerPhoneCode(phoneInfo,
            function(err, code){
            if (err) {
                console.log(err);
                phoneInfo.message = "Internal Server Error";
                self.emit('error', phoneInfo);
            }
            if (code) {
                phoneInfo.code = code;
                self.emit('code-created', phoneInfo);
            }
        });
    };

    var createVolunteerPhoneCode = function(phoneInfo){
        tokenWriteService.createVolunteerPhoneCode(phoneInfo,

            function(err, code){
            if (err) {
                phoneInfo.message = "Internal Server Error";
                self.emit('error', phoneInfo);
            }
            if (code) {
                phoneInfo.code = code;
                self.emit('code-created', phoneInfo);
            }

        });
    };

    self.generatePartnerPhoneVerificationCode = function(args, next){
        continueWith = next;
        var phoneInfo = new PartnerPhoneInfo(args);
        self.emit('info-received', phoneInfo);
    };

    self.generateVolunteerPhoneVerificationCode = function(args, next) {
        continueWith = next;
        var phoneInfo = new PartnerPhoneInfo(args);
        self.emit('volunteer-phone-info-received', phoneInfo);
    };

    var successful = function(phoneInfo){
        var codeResult = new PhoneCodeGenerationResult();
        codeResult.code = phoneInfo.code;
        codeResult.success = true;
        codeResult.message = "Activation Token Generated Successfully";
        self.emit('code-gen-success', codeResult);
        if(continueWith){
            continueWith(null, codeResult);
        }

    };
    var unsuccessful = function(phoneInfo){
        var codeResult = new PhoneCodeGenerationResult();
        codeResult.success = false;
        codeResult.message = phoneInfo.message;
        self.emit('code-gen-failure', codeResult);
        if(continueWith){
            continueWith(null, codeResult);
        }
    };

    //event wiring
    self.on("info-received", validatePartnerPhoneInfo);
    self.on('valid-phone-info', removePartnerPhoneCode);
    self.on("volunteer-phone-info-received",validateVolunteerPhoneInfo);
    self.on('valid-volunteer-phone-info', removeVolunteerPhoneCode);
    self.on('create-partner-phonecode', createPartnerPhoneCode);
    self.on('create-volunteer-phonecode', createVolunteerPhoneCode);
    self.on('code-created', successful);
    self.on('invalid-phone-info', unsuccessful);
    self.on('error', unsuccessful);


    return self;

};

util.inherits(PhoneCodeGeneration, Emitter);
module.exports = PhoneCodeGeneration;