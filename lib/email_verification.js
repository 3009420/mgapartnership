/**
 * Created by Dominic on 28-Jul-2014.
 */

var Emitter = require('events').EventEmitter;
var util = require('util');
var assert = require('assert');


//var PartnershipVerificationToken =  require('../schemas/partnerverification_schema');
//var VolunteerVerificationToken =  require('../schemas/verification_schema');

var tokenWriteService =  require('../services/token_write_service');
var tokenReadService =  require('../services/token_read_service');
var PartnerWriteService =  require('../services/partner_write_service');
var VolunteerWriteService =  require('../services/volunteer_write_service');

var PartnerValidationInfo = require('../models/partnertoken_validation_info');
var VolunteerValidationInfo = require('../models/volunteer_validation_info');


var verificationResult = function(){
    var result = {
        success:false,
        message:null
    };

    return result;

};

var EmailVerification  = function(args){
    Emitter.call(this);
    var  continueWith = null;
    var self = this;


   var updatePartnerInfo =  function(validationInfo) {

       console.log(validationInfo);
        PartnerWriteService.updatePartner(
            validationInfo._institutionId,
            {
                partnershipState:'verified',
                email:
                {
                    verified: true
                }
            },
            function (err, inst) {
                if (err) {
                    validationInfo.message = err;
                    self.emit('error', validationInfo);
                }
//
                if (inst) {
                    console.log(inst);
                    self.emit('partner-info-updated', validationInfo);
                }else{
                    validationInfo.message = "Unverifiable Partner Information";
                    self.emit('error', validationInfo);
                }

        })
    };

    var validatePartnershipEmailToken = function(validationInfo) {
        tokenReadService.getPartnerToken({token: validationInfo.token}, function (err, doc) {
            if (err){
                validationInfo.message = err;
                self.emit('error', validationInfo);
            }
            if(doc){

                validationInfo._institutionId = doc._institutionId;
                self.emit('valid-partner-token', validationInfo)
            }
        })
    };

    var updateVolunteerInfo =  function(validationInfo) {
       VolunteerWriteService.updateVolunteer(
            validationInfo._volunteerId,
            {
                partnershipState:"verified",
                is_authenticated : true,
                email:
                {
                    verified: true
                }
            },
            function (err, volunteer) {
                if (err) {
                    validationInfo.message = err;
                    self.emit('error', validationInfo);
                }
//                console.log(user);
                if(volunteer){
                    console.log(volunteer);
                    self.emit('volunteer-info-updated', validationInfo);
                }else{
                    validationInfo.message = "Unverifiable Volunteer Information";
                    self.emit('error', validationInfo);
                }

            })
    };

    var validateVolunteerEmailToken = function(validationInfo) {
        tokenReadService.getVolunteerToken({token: validationInfo.token}, function (err, doc) {
            if (err){
                validationInfo.message = err;
                self.emit('error', validationInfo);
            }
            if(doc){
                validationInfo._volunteerId = doc._volunteerId;
                self.emit('valid-volunteer-token', validationInfo)
            }
        })
    };

    self.partnershipEmailVerification = function(args, next) {
        continueWith = next;
        var validationInfo = new PartnerValidationInfo(args);
        self.emit('valid-partner-info', validationInfo);
    };

    self.volunteerEmailVerification = function(verificationTokenModel, next) {
        continueWith = next;
        var validationInfo = new VolunteerValidationInfo(verificationTokenModel);
        self.emit('valid-volunteer-info', validationInfo);
    };


    var success = function(validationInfo){
        var vResult = new verificationResult();
        vResult.success = true;
        vResult.message = "Verification Successful";
        self.emit('email-verification-success', vResult);
        if(continueWith){
            continueWith(null, vResult);
        }
    };

    var failed = function(validationInfo){
        var vResult = new verificationResult();
        vResult.success = false;
        vResult.message = validationInfo.message;
        self.emit('email-verification-failed', vResult);
        if(continueWith){
            continueWith(null, vResult);
        }
    };

    //event wiring
    self.on('valid-partner-info', validatePartnershipEmailToken);
    self.on('valid-partner-token', updatePartnerInfo);
    self.on('partner-info-updated', success);
    self.on('valid-volunteer-info', validateVolunteerEmailToken);
    self.on('valid-volunteer-token', updateVolunteerInfo);
    self.on('volunteer-info-updated', success);
    self.on('error', failed);



    return self;

};

util.inherits(EmailVerification, Emitter);
module.exports = EmailVerification;