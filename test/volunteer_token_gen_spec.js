///**
// * Created by Dominic on 01-Aug-2014.
// */
///**
// * Created by Dominic on 30-Jul-2014.
// */
//
//
//
//var TokenGenerationEngine = require('../lib/volunteertoken_engine');
//var should = require('should');
//var mongoose = require('mongoose');
//var moment = require('moment');
//
//describe("Volunteer Token Generation", function(){
//    var tokenGen = {};
//
//    before(function(done){
////
//        var db = mongoose.connect('mongodb://localhost/mgatestdata');
//        done();
//        tokenGen = new TokenGenerationEngine();
//
//    });
//    describe("Process Token", function(){
//
//        var tokenResult = {};
//
//        before(function(done){
//            tokenResult = tokenGen.processVolunteerToken(
//                {
//                    _id: '53d91c4e470d207c1dde677b',
//                    email: 'testing@gmail.com',
//                    firstName: 'Dominic'
//                },
//                function(err, result){
////                    console.log(err);
//                    tokenResult = result;
//                    console.log(tokenResult.message);
//                    done();
//                });
//
////            console.log(regResult);
//        });
//        it("is successful", function(){
//            tokenResult.success.should.equal(true);
//        });
//
//        it("tells why result has failed", function(){
//            tokenResult.success.should.equal(false);
////                console.log(regResult.message);
//        });
//        it("creates an volunteer", function(){
//           tokenResult.volunteerToken.should.be.defined;
//        });
//
//        it("shows success message", function(){
//           tokenResult.message.should.be.equal("Activation Token Generated Successfully");
//        });
////        it("generates an acknowledgement email");
////        it("sends notification to organization partner mgt terminal");
//
//    });
//
////    describe("an empty or null email", function(){
////        it("is not successful");
////        it("tells the user that email is required",);
////    });
//
////    describe("an empty or null name", function(){
////        it("is not successful");
////        it("tells the user that name is required");
////    });
////
////    describe("an empty verification medium", function(){
////        it("is not successful");
////        it("tells the use that email or contact nos is required");
////    });
//
//});