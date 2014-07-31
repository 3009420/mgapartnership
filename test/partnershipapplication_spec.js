///**
// * Created by Dominic on 14-Jul-2014.
// */
//
//
//var InstitutionRegistration = require('../lib/institutionregistration');
//var should = require('should');
//var mongoose = require('mongoose');
//
//
//
//
//
//describe("Institution Registration", function(){
//    var instReg = {};
//
//    before(function(done){
////        mongoose.connect('mongodb://localhost/mgadatatest');
////        var db = mongoose.connection;
////        db.on('error', console.error.bind(console, 'connection error...'));
////        db.once('open', function callback(){
////            console.log('Database Connection is successfully established');
////        });
////        var InstitutionModel = mongoose.model(institutionSchema);
////        console.log(Institution);
//
//
//        var db = mongoose.connect('mongodb://localhost/mgatestdata');
//
//
//        var InstitutionSchema = require('../schemas/institutionschema');
//        var Institution = db.model('institution', InstitutionSchema);
//
//        instReg = new InstitutionRegistration(Institution);
//        done();
//
//    });
//    describe("A valid application", function(){
//
//        var regResult = {};
//
//        before(function(done){
//            regResult = instReg.applyForPartnership(
//                {
//                    name : 'Abak Medical Centre',
//                    country: 'Nigeria',
//                    email: 'testing@gmail.com',
//                    address: '12 Hospital Road Abak',
//                    locality_lga: 'abak',
//                    region_province_state: 'Akwa Ibom',
//                    contact_person: 'Dominic Thompson'
////                    contact_number: '08032925284'
//                },
//                function(err, result) {
////                    console.log(err);
//                    regResult = result;
//                    console.log(regResult.message);
//                    done();
//                });
//
////            console.log(regResult);
//        });
//        it("is successful", function(){
//               regResult.success.should.equal(true);
//        });
//
//        it("tells why result has failed", function(){
//                regResult.success.should.equal(false);
////                console.log(regResult.message);
//        });
//        it("creates an institution", function(){
//            regResult.institution.should.be.defined;
//        });
//
//        it("shows success message", function(){
//            regResult.message.should.be.equal("Partnership Registration Successful");
//        });
//        it("generates an acknowledgement email");
//        it("sends notification to organization partner mgt terminal");
//
//    });
//
//    describe("an empty or null name", function(){
//        it("is not successful");
//        it("tells the user that name is required");
//    });
//
//    describe("an empty verification medium", function(){
//        it("is not successful");
//        it("tells the use that email or contact nos is required");
//    });
//
//});