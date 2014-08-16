/**
 * Created by Dominic on 28-Jul-2014.
 */

var Emitter = require('events').EventEmitter;
var util = require('util');
var assert = require('assert');


//var tokenWriteService =  require('../services/token_write_service');
var tokenReadService =  require('../services/token_read_service');
var PartnerWriteService =  require('../services/partner_write_service');
var VolunteerWriteService =  require('../services/volunteer_write_service');

var PhoneInfo = require('../models/partner_phone_info');




var verificationResult = function(){
    var result = {
        success:false,
        message:null
    };

    return result;

};

var PhoneVerification  = function(args){
    Emitter.call(this);
    var  continueWith = null;
    var self = this;


   var updatePartnerInfo =  function(phoneInfo) {
       PartnerWriteService.updatePartner(
            phoneInfo._id,
            {
                contact_number:
                {
                    verified: true,
                    number: phoneInfo.contact_number
                }
            },
            function (err, inst) {
                if (err) {
                    phoneInfo.message = "Internal Server Error";
                    self.emit('error', phoneInfo);
                }
//                console.log(inst);
                if (inst) {
                    self.emit('partner-info-updated', phoneInfo);
                }else{
                    phoneInfo.message = "Unverifiable Partner Information";
                    self.emit('error', phoneInfo);
                }

        })
    };

    var validatePartnerPhoneCode = function(phoneInfo) {

       tokenReadService.getPartnerPhoneCode({code: phoneInfo.code, contact_number:phoneInfo.contact_number}, function (err, doc) {
            if (err){
                phoneInfo.message = "Internal Server Error";
                self.emit('error', validationInfo);
            }
            if(doc && doc.code === phoneInfo.code){
                phoneInfo._id = doc._institutionId;
                self.emit('valid-partner-code', phoneInfo)
            }
        })
    };

    var updateVolunteerInfo =  function(phoneInfo) {

       VolunteerWriteService.updateVolunteer(
            phoneInfo._id,
            {
                contact_number:
                {
                    verified: true,
                    number: phoneInfo.contact_number
                }
            },
            function (err, volunteer) {
                if (err) {
                    phoneInfo.message = "Internal Server Error";
                    self.emit('error', phoneInfo);
                }
//                console.log(inst);
                if (volunteer) {
                    self.emit('volunteer-info-updated', phoneInfo);
                }else{
                    phoneInfo.message = "Unverifiable Partner Information";
                    self.emit('error', phoneInfo);
                }


            })
    };

    var validateVolunteerPhoneCode = function(phoneInfo) {
        tokenReadService.getVolunteerPhoneCode({code: phoneInfo.code, contact_number:phoneInfo.contact_number}, function (err, doc) {
            if (err){
                phoneInfo.message = "Internal Server Error";
                self.emit('error', phoneInfo);
            }
            if(doc && doc.code === phoneInfo.code){
                phoneInfo._id = doc._volunteerId;

                self.emit('valid-volunteer-code', phoneInfo)
            }else{
                phoneInfo.message = "Unresolved Volunteer Information";
                self.emit('error', phoneInfo)
            }
        })
    };

    self.partnerPhoneVerification = function(args, next) {
        continueWith = next;
        var validationInfo = new PhoneInfo(args);
        self.emit('valid-partner-info', validationInfo);
    };

    self.volunteerPhoneVerification = function(args, next) {
        continueWith = next;
        var validationInfo = new PhoneInfo(args);

//        console.log(validationInfo);
        self.emit('valid-volunteer-info', validationInfo);
    };


    var success = function(phoneInfo){
        var vResult = new verificationResult();
        vResult.success = true;
        vResult.message = "Verification Successful";
        self.emit('phone-verification-success', vResult);
        if(continueWith){
            continueWith(null, vResult);
        }
    };

    var failed = function(phoneInfo){
        var vResult = new verificationResult();
        vResult.success = false;
        vResult.message = phoneInfo.message;
        self.emit('phone-verification-failed', vResult);
        if(continueWith){
            continueWith(null, vResult);
        }
    };

    //event wiring
    self.on('valid-partner-info', validatePartnerPhoneCode);
    self.on('valid-partner-code', updatePartnerInfo);
    self.on('partner-info-updated', success);
    self.on('valid-volunteer-info', validateVolunteerPhoneCode);
    self.on('valid-volunteer-code', updateVolunteerInfo);
    self.on('volunteer-info-updated', success);
    self.on('error', failed);



    return self;

};

util.inherits(PhoneVerification, Emitter);
module.exports = PhoneVerification;