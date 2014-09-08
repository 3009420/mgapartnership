/**
 * Created by Dominic on 04-Sep-2014.
 */
var MedicGridPartnership = require('../index.js');
var mongoose = require('mongoose');
var should = require('should');
var readService = require('../services/partner_read_service');

describe('Partner Read Specification', function() {
    before(function () {
        mongoose.connect('mongodb://localhost/mgatestdata');
    });


    describe('Check Partner Email Exist', function(){
         var result = undefined;
        before(function(done){
           readService.partnerEmailExist(
               {
                email:"onlythompson@gmail.com"
               }, function(err, data){
               console.log(err);
//               if(data){
                   result =  data;
                   console.log(data);
//               }
           });

            done();

            console.log(result);
        });

        it("has no data", function(){
            result.should.equal(false);
        })

        it("has data", function(){
            result.should.be.defined;
        })
    });

});
