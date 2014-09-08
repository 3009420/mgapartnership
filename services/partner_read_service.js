/**
 * Created by Dominic on 11-Aug-2014.
 */

var InstitutionModel = require('../schemas/institutionschema');

exports.getPartner = function(args, done){

    if(args) {
        InstitutionModel.findOne(
            args,
            function (err, foundInstitution) {
                if (err) {
                  return done(err, null);
                }
                if (foundInstitution) {
                   return done(null, foundInstitution);
                }
            });

    }
};

exports.getPartnerById = function(args, done){

    if(args && args._id) {
        InstitutionModel.findOne(
            {_id:args._id},
            function (err, foundInstitution) {
                if (err) {
                    return done(err, null);
                }
                if (foundInstitution) {
                    return done(null, foundInstitution);
                }
            });

    }
};

exports.getPartners = function(args, done){

    if(args) {
        InstitutionModel.find(
            args,
            function (err, foundInstitutions) {
                if (err) {
                    return done(err, null);
                }
                if (foundInstitutions) {
                    return done(null, foundInstitutions);
                }
            });

    }
};

exports.partnerEmailExist = function(args, done){

    if(args) {
        InstitutionModel.findOne(
            {
                email:{
                    address:args.email
                }
            },
            function (err, foundInstitution) {
                if (err) {
                    return done(err, null);
                }
                if (foundInstitution) {
                   return done(null,true);
                } else {
                    return done(null,false);
                }
            });

    }else{
        var error = "No valid email";
        return done(error, null)
    }
};