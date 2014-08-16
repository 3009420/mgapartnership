/**
 * Created by Dominic on 28-Jul-2014.
 */

var Emitter = require('events').EventEmitter;
var util = require('util');
var assert = require('assert');

var InstitutionRegistration = require('./lib/institution_registration');
var VolunteerRegistration = require('./lib/volunteer_registration');
var PhoneCodeGenerator = require('./lib/phone_codegen');
var PhoneVerificator = require('./lib/phone_verification');
var EmailCodeGenerator = require('./lib/token_engine');
var VolunteerEmailCodeGenerator = require('./lib/volunteer_token_engine');
var EmailTokenVerificator = require('./lib/email_verification');
var volunteerWriteService = require('./services/volunteer_write_service');
var volunteerReadService = require('./services/volunteer_read_service');

var partnerWriteService = require('./services/partner_write_service');
var partnerReadService = require('./services/partner_read_service');


var MedicGridPartnership = function(){
    Emitter.call(this);
    var  continueWith = null;
    var self = this;

//    Registration Aspect of the module
    self.registerPartner = function(args, next){
        var institutionReg = new InstitutionRegistration();
        institutionReg.on('partnership-registration-success', function(regResult){
//
            self.emit('partnership-registration-success', regResult);
        });

        institutionReg.on('partnership-registration-failure', function(regResult){
//
            self.emit('partnership-registration-failure', regResult);
        });

        institutionReg.applyForPartnership(args, next);
    };

    self.registerVolunteer = function(args, next){
        var volunteerReg = new VolunteerRegistration();

        volunteerReg.on('volunteer-registration-success', function(regResult){

            self.emit('volunteer-registration-success', regResult);
        });
        volunteerReg.on('volunteer-registration-failure', function(regResult){

            self.emit('volunteer-registration-failure', regResult);
        });

        volunteerReg.applyForVolunteering(args, next);
    };

    //Phone Code Generation aspect of the code
    var phone_codegen = new PhoneCodeGenerator();

    self.generatePartnerPhoneCode = function(args, next)
    {
        phone_codegen.on('code-gen-success',function(genResult){

            self.emit('code-gen-success', genResult)
        });

        phone_codegen.on('code-gen-failure',function(genResult){

            self.emit('code-gen-failure', genResult)
        });

        phone_codegen.generatePartnerPhoneVerificationCode(args, next);
    };

    self.generateVolunteerPhoneCode = function(args, next)
    {
        phone_codegen.on('code-gen-success',function(genResult){

            self.emit('code-gen-success', genResult)
        });

        phone_codegen.on('code-gen-failure',function(genResult){

            self.emit('code-gen-failure', genResult)
        });

        phone_codegen.generateVolunteerPhoneVerificationCode(args, next);
    };

    var phoneVerificator = new PhoneVerificator();

    self.verifyPartnerPhoneCode = function(args, next)
    {
        phoneVerificator.on('phone-verification-success',function(genResult){

            self.emit('partner-phone-verification-success', genResult)
        });

        phoneVerificator.on('phone-verification-failure',function(genResult){

            self.emit('partner-phone-verification-failure', genResult)
        });

        phoneVerificator.partnerPhoneVerification(args, next);
    };

    self.verifyVolunteerPhoneCode = function(args, next)
    {
        phoneVerificator.on('phone-verification-success',function(genResult){

            self.emit('volunteer-phone-verification-success', genResult)
        });

        phoneVerificator.on('phone-verification-failure',function(genResult){

            self.emit('volunteer-phone-verification-failure', genResult)
        });

        phoneVerificator.volunteerPhoneVerification(args, next);
    };

//   Email Token Generation aspect of the code

    self.generatePartnerEmailToken= function(args, next)
    {
        var emailTokenGeneration = new EmailCodeGenerator();

        emailTokenGeneration.on('partnership-token-success',function(genResult){

            self.emit('partnership-token-success', genResult)
        });

        emailTokenGeneration.on('partnership-token-failure',function(err, genResult){
            if(err){
                self.emit('error', {error: err.toString()})
            }
            self.emit('partnership-token-failure', genResult)
        });

        emailTokenGeneration.processPartnershipToken(args, next);
    };

    var emailTokenVerifier = new EmailTokenVerificator();

    self.verifyPartnerEmailToken= function(args, next)
    {
//        var emailTokenGeneration = new EmailCodeGenerator();

        emailTokenVerifier.on('email-verification-success',function(genResult){

            self.emit('partner-email-verification-success', genResult)
        });

        emailTokenVerifier.on('email-verification-failure',function(genResult){

            self.emit('partner-email-verification-failure', genResult)
        });

        emailTokenVerifier.partnershipEmailVerification(args, next);
    };

    self.generateVolunteerEmailToken = function(args, next)
    {

        var volunteerEmailTokenGen =  new VolunteerEmailCodeGenerator();
        volunteerEmailTokenGen.on('volunteer-token-success',function(genResult){

            self.emit('volunteer-token-success', genResult)
        });

        volunteerEmailTokenGen.on('volunteer-token-failure',function(genResult){
            if(err){
                self.emit('error', {error: err.toString()})
            }
            self.emit('volunteer-token-failure', genResult)
        });

        volunteerEmailTokenGen.processVolunteerToken(args, next);
    };

    self.verifyVolunteerEmailToken= function(args, next)
    {
//        var emailTokenGeneration = new EmailCodeGenerator();

        emailTokenVerifier.on('email-verification-success',function(genResult){

            self.emit('volunteer-email-verification-success', genResult)
        });

        emailTokenVerifier.on('email-verification-failure',function(genResult){
            if(err){
                self.emit('error', {error: err.toString()})
            }
            self.emit('volunteer-email-verification-failure', genResult)
        });

        emailTokenVerifier.volunteerEmailVerification(args, next);
    };

    self.volunteers = {
        read : volunteerReadService,
        execute: volunteerWriteService
    };

    self.partners = {
        read : partnerReadService,
        execute: partnerWriteService
    };
    return self;
};


util.inherits(MedicGridPartnership, Emitter);
module.exports = MedicGridPartnership;