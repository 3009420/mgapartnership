/**
 * Created by Dominic on 14-Jul-2014.
 */
var InstitutionInfo = require("../models/institution_info");
var PartnershipApplication = require("../models/partnership_application");

var Emitter = require('events').EventEmitter;
var util = require('util');
var assert = require('assert');

var RegResult = function(){

    var result = {
        success:false,
        message:null,
        institution:null
    };

    return result;

};

var InstitutionRegistration = function(dbModel){

    Emitter.call(this);
    var  continueWith = null;
    var self = this;

//    self.dbModel = dbModel;

    var validateInputs = function(partnershipApp){
        if(!partnershipApp.name){
            partnershipApp.setInvalid("Institution name is required");
            self.emit("invalid-application", partnershipApp);
        }

        if(!partnershipApp.address){
            partnershipApp.setInvalid("Institution address  is required");
            self.emit("invalid-application", partnershipApp);
        }

        if(!partnershipApp.locality_lga){
            partnershipApp.setInvalid("locality or local government is required");
            self.emit("invalid-application", partnershipApp);
        }

        if(!partnershipApp.region_province_state){
            partnershipApp.setInvalid("region or province or state of primary is required");
            self.emit("invalid-application", partnershipApp);
        }

        if(!partnershipApp.contact_person){
            partnershipApp.setInvalid("name of contact person for Institution is required");
            self.emit("invalid-application", partnershipApp);
        }

        if(!partnershipApp.country){
            partnershipApp.setInvalid("country is required");
            self.emit("invalid-application", partnershipApp);
        }
        if(!partnershipApp.email&& !partnershipApp.contact_number){
            partnershipApp.setInvalid("contact email and phone number is required");
            self.emit("invalid-application", partnershipApp);
        }

        partnershipApp.validate();
        self.emit("validated", partnershipApp);
    };

//
    var checkIfInstitutionEmailExist = function(partnershipApp){

        if(partnershipApp.email) {
            dbModel.findOne({'email': partnershipApp.email}, function (err, foundInstitution) {
                if (err) {
                    partnershipApp.setInvalid("Internal Server Error");
//                LogInternalServerError(err.toString());
                    self.emit('error', partnershipApp);
                }
                if (foundInstitution) {
                    partnershipApp.setInvalid("Institution e-mail already exist");
                    self.emit('invalid-application', partnershipApp);
                } else {

                    self.emit('is-validInstitutionEmail', partnershipApp);
                }
            });
        }else{
//
            self.emit('is-validInstitutionEmail', partnershipApp);
        }
    };

    var checkIfInstitutionContactNosExist = function(partnershipApp){

        if(partnershipApp.contact_number) {
            dbModel.findOne({'contact_number': partnershipApp.contact_number}, function (err, foundInstitution) {
                if (err) {
                  partnershipApp.setInvalid( "Internal Server Error");
//                LogInternalServerError(err.toString());
                  self.emit('error', partnershipApp);
                }

//                assert(err === null);
                if (foundInstitution) {
                    partnershipApp.setInvalid("Institution contact-number already exist");
                    self.emit('invalid-application', partnershipApp);
                } else {
                    self.emit('is-validInstitutionContactNos', partnershipApp);
                }
            });

        }else {
            self.emit('is-validInstitutionContactNos', partnershipApp);
        }
    };

    var createPartnershipAccount = function(partnershipApp){
        var institutionInfo = new InstitutionInfo(partnershipApp);

        dbModel.create(institutionInfo, function(err, newInstitution){
            if(err){
                partnershipApp.setInvalid("Internal Server Error");
//                LogInternalServerError(err.toString());
                self.emit('error', partnershipApp);
            }
            if(newInstitution){
                partnershipApp.institution = newInstitution;
                self.emit('partnershipAccount-created', partnershipApp);
            }
        });
    };

    self.applyForPartnership = function(args, next){
      //receive information
        continueWith = next;
        var partnershipApp = new PartnershipApplication(args);

        self.emit("entry-received", partnershipApp);
    };

    var successfulRegistration = function(partnershipApp){
        var oprResult = new RegResult();
        oprResult.success = true;
        oprResult.message = "Partnership Registration Successful";
        oprResult.institution= partnershipApp.institution;
        self.emit('partnership-registration-success', oprResult);
        if(continueWith){
            continueWith(null, oprResult);
        }
    };

    var unsuccessfulRegistration = function(partnershipApp){
        var oprResult = new RegResult();
        oprResult.success = false;
        oprResult.message = partnershipApp.message;
        self.emit('partnership-registration-failure', oprResult);
        if(continueWith){
            continueWith(null, oprResult);
        }
    };

//
    // events wiring
    self.on("entry-received", validateInputs);
    self.on("validated", checkIfInstitutionEmailExist);
    self.on("is-validInstitutionEmail", checkIfInstitutionContactNosExist);
    self.on("is-validInstitutionContactNos", createPartnershipAccount);
    self.on("partnershipAccount-created", successfulRegistration);
    self.on("invalid-application", unsuccessfulRegistration);
    self.on("error", unsuccessfulRegistration);

    return self;

};


util.inherits(InstitutionRegistration, Emitter);
module.exports = InstitutionRegistration;