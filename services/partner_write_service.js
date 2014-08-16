/**
 * Created by Dominic on 11-Aug-2014.
 */
var InstitutionModel = require('../schemas/institutionschema');

exports.createPartner = function(args, done) {

    InstitutionModel.create(args, function(err, newInstitution){
        if(err){

            return done(err, null);
        }
        if(newInstitution){
           return done(null, newInstitution);
        }
    });
};


exports.updatePartner = function(_id, args, done) {
    InstitutionModel.findByIdAndUpdate(_id, args, function(err, updatedInstitution){
        if(err){
            return done(err, null);
        }
        if(updatedInstitution){
//            console.log(updatedInstitution);
            return done(null, updatedInstitution);
        }
    });
};

exports.removePartner = function(args, done) {
    InstitutionModel.findOneAndRemove(args, function(err){
        if(err){
            return false;
        }
        return done(null, true);
    });
};