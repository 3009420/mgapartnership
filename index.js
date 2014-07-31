/**
 * Created by Dominic on 28-Jul-2014.
 */

var Emitter = require('events').EventEmitter;
var util = require('util');
var assert = require('assert');

var InstitutionRegistration = require('../lib/institutionregistration');
var VolunteerRegistration = require('../volunteer_registration');


var MedicGridPartnership = function(){
    Emitter.call(this);
    var  continueWith = null;
    var self = this;


    self.registerPartner = function(args, dbSchema, next){
        var institutionReg = new InstitutionRegistration(dbSchema);
        institutionReg.on('partnership-registration-success', function(regResult){
            self.emit('partnership-registration-success', regResult);
        });

        institutionReg.on('partnership-registration-failure', function(regResult){
            self.emit('partnership-registration-failure', regResult);
        });

        institutionReg.applyForPartnership(args, next);
    };

    self.registerVolunteer = function(args, dbSchema, next){
        var volunteerReg = new VolunteerRegistration(dbSchema);

        volunteerReg.on('volunteer-registration-success', function(regResult){
            self.emit('volunteer-registration-success', regResult);
        });
        volunteerReg.on('volunteer-registration-failure', function(regResult){
            self.emit('volunteer-registration-failure', regResult);
        })
    };



    return self;
};


util.inherits(MedicGridPartnership, EventEmitter);
module.exports = MedicGridPartnership;