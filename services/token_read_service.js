/**
 * Created by Dominic on 12-Aug-2014.
 */
var PartnershipVerificationToken =  require('../schemas/partnerverification_schema');
var VolunteerVerificationToken =  require('../schemas/verification_schema');
var PartnerPhoneVerification =  require('../schemas/partner_phone_verification');
var VolunteerPhoneVerification =  require('../schemas/volunteer_phone_verification');

exports.getVolunteerToken = function(validationInfo, next) {
    VolunteerVerificationToken.findOne({token: validationInfo.token}, function (err, doc) {
        if (err){
            return next(err, null)
        }
        if(doc){
            return next(null, doc);
        }else{
            err = "Token Not Found";
            return next(err, null)
        }

    })
};

exports.getPartnerToken = function(validationInfo, next) {

    PartnershipVerificationToken.findOne({token: validationInfo.token}, function (err, doc) {
        if (err){
            return next(err, null);
        }
        if(doc){
            console.log(doc);
            return next(null, doc);
        }else{
            err = "Token Not Found";
            return next(err, null)
        }
    })
};

exports.getPartnerPhoneCode = function(args, next) {
    PartnerPhoneVerification.findOne({code: args.code, contact_number:args.contact_number}, function (err, doc) {
        if (err){
            return next(err, null);
        }
        if(doc){
          return next(null, doc);
        }else{
            err = "Code Information Not Found";
            return next(err, null)
        }
    })
};

exports.getVolunteerPhoneCode = function(args, next) {
    VolunteerPhoneVerification.findOne({code: args.code, contact_number:args.contact_number}, function (err, doc) {
        if (err){
            return next(err, null);
        }
        if(doc){
//            console.log(doc);
            return next(null, doc);
        }else{
            err = "Code Information Not Found";
            return next(err, null)
        }
    })
};
