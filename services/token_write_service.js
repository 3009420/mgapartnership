/**
 * Created by Dominic on 12-Aug-2014.
 */

var VolunteerVerificationToken =  require('../schemas/verification_schema');
var PartnershipVerificationToken =  require('../schemas/partnerverification_schema');

var VolunteerPhoneVerification =  require('../schemas/volunteer_phone_verification');
var PartnerPhoneVerification =  require('../schemas/partner_phone_verification');

exports.removePartnerEmailToken = function(args, next){
    PartnershipVerificationToken.findOneAndRemove({_institutionId: args._institutionId},
        function (err) {
            if (err) {
               return next(err, null);
            }

          return next(null, true);

        });
};

exports.removePartnerPhoneCode = function(args, next){
    PartnerPhoneVerification.findOneAndRemove({_institutionId: args._id},
        function (err) {
            if (err) {
                return next(err, null);
            }

            return next(null, true);

        });
};

exports.createPartnerEmailToken =  function(args, next) {
    var partnershipTokenModel = new PartnershipVerificationToken({_institutionId: args._id});
    partnershipTokenModel.createVerificationToken(function (err, token) {
        if (err) {
            return next(err, null);
        }
        if (token) {
           return next(null, token);
        }
    });
};

exports.removeVolunteerEmailToken = function(args, next){
    VolunteerVerificationToken.findOneAndRemove({_volunteerId: args._volunteerId},
        
            function (err) {
                if (err) {
                    return next(err, null);
                }

                return next(null, true);

        });
};


exports.removeVolunteerPhoneCode = function(args, next){
    VolunteerPhoneVerification.findOneAndRemove({_volunteerId: args._id},
        function (err) {
            if (err) {
                return next(err, null);
            }

            return next(null, true);

        });
};
exports.createVolunteerEmailToken =  function(args, next) {

    var volunteerTokenModel = new VolunteerVerificationToken({_volunteerId: args._id});
    volunteerTokenModel.createVerificationToken(function (err, token) {
        if (err) {
            return next(err, null);
        }
        if (token) {
            return next(null, token);
        }
    });
};


exports.createPartnerPhoneCode = function(args, next){
    var partnerPhone = new PartnerPhoneVerification({_institutionId: args._id, contact_number: args.contact_number });
    partnerPhone.createVerificationToken(function (err, code) {
        if (err){
            return next(err, null);
        }
        if(code){
            return next(null, code);
        }


    });
};

exports.createVolunteerPhoneCode = function(args, next){
    var volunteerPhone = new VolunteerPhoneVerification({_volunteerId: args._id, contact_number: args.contact_number });
    volunteerPhone.createVerificationToken(function (err, code) {
        if (err){
            return next(err, null);
        }
        if(code){
            return next(null, code);
        }
    });
};