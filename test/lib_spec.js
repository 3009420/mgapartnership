///**
// * Created by Dominic on 11-Aug-2014.
// */
//
//var MedicGridPartnership = require('../index.js');
//var mongoose = require('mongoose');
//var should = require('should');
//var writeService = require('../services/partner_write_service');
//var moment = require('moment');
//
//describe('Partnership Library Specification', function(){
//    var partnershipManager;
//    before(function(done){
//        mongoose.connect('mongodb://localhost/mgatestdata');
//
////        writeService.removePartner(
////            {
////                email :{
////                    address: 'uuth2@gmail.com'
//////                    verified: false
////                },
////                contact_number: {
////                    number: '08032925454'
//////                    verified: false
////                }
////            },
////            function(err, result){
////            if(err){
////                console.log(err);
////            }
////
////            console.log(result);
////        });
//        partnershipManager = new MedicGridPartnership();
//        done();
//    });
//
////    describe('Partner Registration', function(){
////
////        var partnerResult = {};
////        before(function(done){
////           partnerResult =  partnershipManager.registerPartner(
////                {
////                    name : 'UUTH2',
////                    country: 'Nigeria',
////                    email: 'uuth2@gmail.com',
////                    address: '124 Abak Road',
////                    locality_lga: 'UYO',
////                    region_province_state: 'Akwa Ibom',
////                    contact_person: 'Dominic Thompson',
////                    contact_number: '08032925454'
////                },
////                function(err, result){
////                    if(err) {
////                        console.log(err);
////                    }
////                    partnerResult = result;
////                    console.log(partnerResult.message);
////                    done();
////                }
////            );
////        });
////
////
////        it("is successful", function(){
////               partnerResult.success.should.equal(true);
////        });
////
////        it("creates an institution", function(){
////            partnerResult.institution.should.be.defined;
////        });
////
////        it("shows success message", function(){
////            partnerResult.message.should.be.equal("Partnership Registration Successful");
////        });
////    });
////
////    describe('Volunteer Registration', function(){
////
////        var volunteerResult = {};
////        before(function(done){
////
////            partnershipManager.volunteers.execute.removeVolunteer(
////                { email :{ address: 'dominic2@gmail.com'} },
////                    function(err, result)
////                    { if (err) { console.log(err);}
////                        console.log(result);
////                    });
////
////            volunteerResult =  partnershipManager.registerVolunteer(
////                {
////                    firstName : 'Dominic',
////                    surname: 'Thompson',
////                    country: 'Nigeria',
////                    email: 'dominic2@gmail.com',
////                    address: '12 Hospital Road Abak',
////                    locality_lga: 'abak',
////                    region_province_state: 'Akwa Ibom',
////                    birthDate: moment('28/03/1954', 'DD/MM/YYYY'),
////                    gender: 'Male',
////                    contact_number: '08032925223'
////                },
////                function(err, result){
////                    if(err) {
////                        console.log(err);
////                    }
////                    volunteerResult = result;
////                    console.log(volunteerResult.message);
////                    done();
////                }
////            );
////        });
////
////
////        it("is successful", function(){
////            volunteerResult.success.should.equal(true);
////        });
////
////        it("creates an institution", function(){
////            volunteerResult.volunteer.should.be.defined;
////        });
////
////        it("shows success message", function(){
////            volunteerResult.message.should.be.equal("Volunteer Registration Successful");
////        });
////    });
//
//
////    describe('Update Volunteer Information', function(){
////        var query = {};
////        before(function(){
////                partnershipManager.volunteers.read.getVolunteer(
////                {email : 'testing@gmail.com'},
////                    function(err, doc){
////                        if(err) console.log(err);
////                        if(doc){
////                            query = doc;
////                        }
////                    });
////
////        });
////
////
////        describe('Update Volunteer Operation', function(){
////            var updatedVolunteer = {};
////            before(function(){
////
////                partnershipManager.volunteers.execute.updateVolunteer(
////                    '53d91c4e470d207c1dde677b',
////                    {
////                        firstName : 'Marvel',
////                        surname: 'Dominic',
////                        address: 'Ikot Ekpeyak Ikonno'
////
////                    },
////                    function(err, result){
////                        if(err) {
////                            console.log(err);
////                        }
////                        if(result) {
////                            updatedVolunteer = result;
//////                            console.log(updatedVolunteer);
////                        }
////                    }
////                );
////            });
////
////            it('Check firstName update', function(){
////                updatedVolunteer.firstName.should.equal('Marvel');
////            });
////
////
////            it('Check surname update', function(){
////                updatedVolunteer.surname.should.equal('Dominic');
////            });
////
////
////            it('Check Address update', function(){
////                updatedVolunteer.address.should.equal('Ikot Ekpeyak Ikonno');
////            });
////
////        });
////
////
////    });
////    Phone Code Generation
//
////    describe('Generate Volunteer Code' , function(){
////        var result = {};
////        before(function(done){
////            result = partnershipManager.generateVolunteerPhoneCode(
////                {   _id: '53eb52c7bcb6ae6c23d50a47',
////                    contact_number: '08032925223'
////                },
////                function(err, codeResult){
////                    if(err){
////                        console.log(err);
////                    }
////                    if(codeResult) {
////                        result = codeResult;
////                    }
////                    done();
////                }
////            )
////        });
////
////        it("is successful", function(){
////            result.success.should.equal(true);
////        });
////
////        it("creates an institution", function(){
////           result.code.should.be.defined;
////        });
////
////        it("shows success message", function(){
////            result.message.should.be.equal("Activation Token Generated Successfully");
////        });
////    });
////
////
////    describe('Generate Partner Code' , function(){
////        var result = {};
////        before(function(done){
////            result = partnershipManager.generatePartnerPhoneCode(
////                {   _id: '53ede0bde3bfe53826f555c7',
////                    contact_number: '08032925454'
////                },
////                function(err, codeResult){
////                    if(err){
////                        console.log(err);
////                    }
////                    if(codeResult) {
////                        result = codeResult;
////                    }
////                    done();
////                }
////            )
////        });
////
////        it("is successful", function(){
////            result.success.should.equal(true);
////        });
////
////        it("creates a partnercode", function(){
////            result.code.should.be.defined;
////        });
////
////        it("shows success message", function(){
////            result.message.should.be.equal("Activation Token Generated Successfully");
////        });
////    });
//
//// Phone Code Verification
////    describe('Verifies Partner Phone Code' , function(){
////        var result = {};
////        before(function(done){
////            result = partnershipManager.verifyPartnerPhoneCode(
////                {   code:'246642',
////                    contact_number: '08032925454'
////                },
////                function(err, codeResult){
////                    if(err){
////                        console.log(err);
////                    }
////                    if(codeResult) {
////                        result = codeResult;
//////                        console.log(result);
////
////                    }
////                    done();
////                }
////            )
////        });
////
////        it("is successful", function(){
////            result.success.should.equal(true);
////        });
////
////
////        it("shows success message", function(){
////            result.message.should.be.equal("Verification Successful");
////        });
////    });
////
////    describe('Verifies Volunteer Phone Code' , function(){
////        var result = {};
////        before(function(done){
////            result = partnershipManager.verifyVolunteerPhoneCode(
////                {   code:'246642',
////                    contact_number: '08032925223'
////                },
////                function(err, codeResult){
////                    if(err){
////                        console.log(err);
////                    }
////                    if(codeResult) {
////                        result = codeResult;
//////                        console.log(result);
////
////                    }
////                    done();
////                }
////            )
////        });
////
////        it("is successful", function(){
////            result.success.should.equal(true);
////        });
////
////
////        it("shows success message", function(){
////            result.message.should.be.equal("Verification Successful");
////        });
////    });
//
////Email Token Generation
//
//
//    describe('Generate Partner Email Token' , function(){
//        var result = {};
//        before(function(done){
//            result = partnershipManager.generatePartnerEmailToken(
//                {   _id: '53ede0bde3bfe53826f555c7'
//                },
//                function(err, codeResult){
//                    if(err){
//                        console.log(err);
//                    }
//                    if(codeResult) {
//                        result = codeResult;
////                        console.log(result);
//                    }
//                    done();
//                }
//            )
//        });
//
//        it("is successful", function(){
//            result.success.should.equal(true);
//        });
//
//        it("creates a partner email code", function(){
//            result.institutionToken.should.be.defined;
//        });
//
//        it("shows success message", function(){
//            result.message.should.be.equal("Activation Token Generated Successfully");
//        });
//    });
//
////    describe('Generate Volunteer Email Token' , function(){
////        var result = {};
////        before(function(done){
////            result = partnershipManager.generateVolunteerEmailToken(
////                {   _id: '53eb52c7bcb6ae6c23d50a47'
////                },
////                function(err, codeResult){
////                    if(err){
////                        console.log(err);
////                    }
////                    if(codeResult) {
////                        result = codeResult;
//////                        console.log(result);
////                    }
////                    done();
////                }
////            )
////        });
////
////        it("is successful", function(){
////            result.success.should.equal(true);
////        });
////
////        it("creates a partner email code", function(){
////            result.volunteerToken.should.be.defined;
////        });
////
////        it("shows success message", function(){
////            result.message.should.be.equal("Activation Token Generated Successfully");
////        });
////    });
//
////   Email Verification
//
//    describe('Verify Partner Email Token' , function(){
//        var result = {};
//        before(function(done){
//            result = partnershipManager.verifyPartnerEmailToken(
//                {   token: '7082f5c0-a0a6-4c43-8691-19cdc8fbf796'
//                },
//                function(err, codeResult){
//                    if(err){
//                        console.log(err);
//                    }
//                    if(codeResult) {
//                        result = codeResult;
////                        console.log(result);
//                    }
//                    done();
//                }
//            )
//        });
//
//        it("is successful", function(){
//            result.success.should.equal(true);
//        });
//
//
//        it("shows success message", function(){
//            result.message.should.be.equal("Verification Successful");
//        });
//    });
//
////    describe('Verify Volunteer Email Token' , function(){
////        var result = {};
////        before(function(done){
////            result = partnershipManager.verifyVolunteerEmailToken(
////                {   token: 'ff3a6a90-066c-4e78-9fba-0105f0b30898'
////                },
////                function(err, codeResult){
////                    if(err){
////                        console.log(err);
////                    }
////                    if(codeResult) {
////                        result = codeResult;
//////                        console.log(result);
////                    }
////                    done();
////                }
////            )
////        });
////
////        it("is successful", function(){
////            result.success.should.equal(true);
////        });
////
////
////        it("shows success message", function(){
////            result.message.should.be.equal("Verification Successful");
////        });
////    });
//});