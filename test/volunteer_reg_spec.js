/**
 * Created by Dominic on 30-Jul-2014.
 */



var VolunteerRegistration = require('../lib/volunteer_registration');
var should = require('should');
var mongoose = require('mongoose');
var moment = require('moment');

//var db = mongoose.createConnection('localhost','mgatestdata');
//Mongoose.createConnection('localhost', 'mydatabase');

//var volunteerSchema = require('../schemas/volunteerschema');
//var volunteer = db.model('volunteer', volunteerSchema);


describe("Volunteer Registration", function(){
    var volunteerReg = {};

    before(function(done){
//
        var db = mongoose.connect('mongodb://localhost/mgatestdata');

        var volunteerSchema = require('../schemas/volunteerschema');
        var volunteer = db.model('volunteer', volunteerSchema);

        volunteerReg = new VolunteerRegistration(volunteer);
        done();

    });
    describe("A valid application", function(){

        var regResult = {};

        before(function(done){
            regResult = volunteerReg.applyForVolunteering(
                {
                    firstName : 'Dominic',
                    surname: 'Thompson',
                    country: 'Nigeria',
                    email: 'dominic@gmail.com',
                    address: '12 Hospital Road Abak',
                    locality_lga: 'abak',
                    region_province_state: 'Akwa Ibom',
                    birthDate: moment('28/03/1986', 'DD/MM/YYYY'),
                    gender: 'Male'
//                    contact_number: '08032925284'
                },
                function(err, result){
//                    console.log(err);
                    regResult = result;
                    console.log(regResult.message);
                    done();
                });

//            console.log(regResult);
        });
        it("is successful", function(){
            regResult.success.should.equal(true);
        });

        it("tells why result has failed", function(){
            regResult.success.should.equal(false);
//                console.log(regResult.message);
        });
        it("creates an volunteer", function(){
            regResult.volunteer.should.be.defined;
        });

        it("shows success message", function(){
            regResult.message.should.be.equal("Volunteer Registration Successful");
        });
        it("generates an acknowledgement email");
        it("sends notification to organization partner mgt terminal");

    });

    describe("an empty or null name", function(){
        it("is not successful");
        it("tells the user that name is required");
    });

    describe("an empty verification medium", function(){
        it("is not successful");
        it("tells the use that email or contact nos is required");
    });

});