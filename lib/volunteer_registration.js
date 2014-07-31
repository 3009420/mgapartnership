/**
 * Created by Dominic on 14-Jul-2014.
 */
var VolunteerInfo = require("../models/volunteer_info");
var VolunteerApplication = require("../models/volunteer_application");

var Emitter = require('events').EventEmitter;
var util = require('util');
var assert = require('assert');
var moment = require('moment');

var VolunteerRegResult = function(){
    var result = {
        success:false,
        message:null,
        volunteer:null
    };

    return result;

};

var VolunteerRegistration = function(dbModel){

    Emitter.call(this);
    var  continueWith = null;
    var self = this;

//    self.dbModel = dbModel;

    var validateInputs = function(volunteerApp){
        if(!volunteerApp.firstName){
            volunteerApp.setInvalid("First Name is required");
            self.emit("invalid-application", volunteerApp);
        }

        if(!volunteerApp.surname){
            volunteerApp.setInvalid("Surname is required");
            self.emit("invalid-application", volunteerApp);
        }

        if(!volunteerApp.gender){
            volunteerApp.setInvalid("Gender is required");
            self.emit("invalid-application", volunteerApp);
        }

        if(!volunteerApp.birthDate){
            volunteerApp.setInvalid("Birth Date is required");
            self.emit("invalid-application", volunteerApp);
        }

        if(!moment(volunteerApp.birthDate).isValid()){
            volunteerApp.setInvalid("Invalid date format");
            self.emit("invalid-application", volunteerApp);
        }

        if(!volunteerApp.address){
            volunteerApp.setInvalid("address  is required");
            self.emit("invalid-application", volunteerApp);
        }
        if(!volunteerApp.locality_lga){
            volunteerApp.setInvalid("locality or local government is required");
            self.emit("invalid-application", volunteerApp);
        }

        if(!volunteerApp.region_province_state){
            volunteerApp.setInvalid("region or province or state of primary is required");
            self.emit("invalid-application", volunteerApp);
        }

        if(!volunteerApp.country){
            volunteerApp.setInvalid("country is required");
            self.emit("invalid-application", volunteerApp);
        }
        if(volunteerApp.email == null && volunteerApp.contact_number == null){
            volunteerApp.setInvalid("contact email or phone number is required");
            self.emit("invalid-application", volunteerApp);
        }

        volunteerApp.validate();
        self.emit("validated", volunteerApp);
    };

//
    var checkIfVolunteerEmailExist = function(volunteerApp){
        if(volunteerApp.email) {
            dbModel.findOne({'email': volunteerApp.email}, function (err, foundVolunteer) {
                if (err) {
                    volunteerApp.setInvalid("Internal Server Error");
//                LogInternalServerError(err.toString());

                    self.emit('error', volunteerApp);
                }
                if (foundVolunteer) {
//                    console.log(foundVolunteer);
                    volunteerApp.setInvalid("volunteer e-mail already exist");
                    self.emit('invalid-application', volunteerApp);
                } else {
                    self.emit('is-validVolunteerEmail', volunteerApp);
                }
            });
        }else{
            self.emit('is-validVolunteerEmail', volunteerApp);
        }
    };

    var checkIfVolunteerContactNosExist = function(volunteerApp){

        if(volunteerApp.contact_number) {
            dbModel.findOne({'contact-number': volunteerApp.contact_number}, function (err, foundvolunteer) {
                if (err) {
                    volunteerApp.setInvalid("Internal Server Error");
//                LogInternalServerError(err.toString());

                    self.emit('error', volunteerApp);
                }
                if (foundvolunteer) {
                    volunteerApp.setInvalid("Volunteer contact-number already exist");
                    self.emit('invalid-application', volunteerApp);
                } else {
                    self.emit('is-validVolunteerContactNos', volunteerApp);
                }
            });
        }else {
            self.emit('is-validVolunteerContactNos', volunteerApp);
        }
    };

    var createVolunteerAccount = function(volunteerApp){
        var volunteerInfo = new VolunteerInfo(volunteerApp);

        dbModel.create(volunteerInfo, function(err, newVolunteer){
            if(err){
                volunteerApp.setInvalid("Internal Server Error");
                         console.log(err.toString());
                self.emit('error', volunteerApp);
            }
            if(newVolunteer){
                volunteerApp.volunteer = newVolunteer;
                self.emit('volunteerAccount-created', volunteerApp);
            }
        });
    };

    self.applyForVolunteering = function(args, next){
      //receive information
        continueWith = next;
        var volunteerApp = new VolunteerApplication(args);
        self.emit("entry-received", volunteerApp);
    };

    var successfulRegistration = function(volunteerApp){
        var oprResult = new VolunteerRegResult();
        oprResult.success = true;
        oprResult.message = "Volunteer Registration Successful";
        oprResult.volunteer= volunteerApp.volunteer;
        self.emit('volunteer-registration-success', oprResult );
        if(continueWith){
            continueWith(null, oprResult);
        }
    };

    var unsuccessfulRegistration = function(volunteerApp){
        var oprResult = new VolunteerRegResult();
        oprResult.success = false;
        oprResult.message = volunteerApp.message;
        self.emit('volunteer-registration-failure', oprResult );
        if(continueWith){
            continueWith(null, oprResult);
        }
    };


    // events wiring
    self.on("entry-received", validateInputs);
    self.on("validated", checkIfVolunteerEmailExist);
    self.on("is-validVolunteerEmail", checkIfVolunteerContactNosExist);
    self.on("is-validVolunteerContactNos", createVolunteerAccount);
    self.on("volunteerAccount-created",successfulRegistration);
    self.on("invalid-application", unsuccessfulRegistration);
    self.on("error", unsuccessfulRegistration);

    return self;

};


util.inherits(VolunteerRegistration, Emitter);
module.exports = VolunteerRegistration;