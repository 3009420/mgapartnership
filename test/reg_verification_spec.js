///**
//* Created by Dominic on 30-Jul-2014.
//*/
//
//var EmailVerification = require('../lib/email_verification');
//var should = require('should');
//var mongoose = require('mongoose');
//
//
//describe('Email Verification', function(){
//
//    var verification = {};
//
//   before(function(done){
//      verification = new EmailVerification();
//       var db = mongoose.connect('mongodb://localhost/mgatestdata');
//       done();
//   }) ;
//
//   describe("Partner Token Verification", function(){
//
//       var partnerVerification = {};
//       before(function(done){
//          partnerVerification = verification.partnershipEmailVerification(
//              {
////                _institutionId: '53d900584415cba01fd4882c',
//                  token: 'ddd57845-0487-4bb9-8f80-70cfdcf45753'
//              }, function(err, result){
//                  if(err) {
//                      console.log(err);
//                  }
//                    partnerVerification = result;
//                    console.log(partnerVerification.message);
//                    done();
//
//              });
//       });
//
//       it('validates a partner token', function(){
//           partnerVerification.success.should.equal(true);
//       });
//
//   });
//
////
////    describe("Volunteer Token Verification", function(){
////
////        var volunteerVerification = {};
////        before(function(done){
////            volunteerVerification = verification.volunteerEmailVerification(
////                {
//////                   _volunteerId: '53d91c4e470d207c1dde677b',
////                    token: '7eb8392e-c8fe-4b43-bdee-a692025874eb'
////                }, function(err, result){
////                    if(err) {
////                        console.log(err);
////                    }
////                    volunteerVerification = result;
////                    console.log(volunteerVerification.message);
////                    done();
////
////                });
////        });
////
////        it('validates a volunteer token', function(){
////            volunteerVerification.success.should.equal(true);
////        });
////
////    })
//});