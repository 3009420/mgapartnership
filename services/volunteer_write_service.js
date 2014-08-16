/**
 * Created by Dominic on 11-Aug-2014.
 */
var VolunteerModel = require('../schemas/volunteerschema');

exports.createVolunteer = function(args, done) {

    VolunteerModel.create(args, function(err, newVolunteer){
        if(err){

            return done(err, null);
        }
        if(newVolunteer){
           return done(null, newVolunteer);
        }
    });
};


exports.updateVolunteer = function(_id, args, done) {
    if(_id) {

        VolunteerModel.findByIdAndUpdate(_id, args, function (err, updatedVolunteer) {
            if (err) {
                return done(err, null);
            }
            if (updatedVolunteer) {
                return done(null, updatedVolunteer);
            }
        });
    }else{
        return done(null, null);
    }

};

exports.removeVolunteer = function(args, done) {
    VolunteerModel.findOneAndRemove(args, function(err){
        if(err){
            return false;
        }
        return done(null, true);
    });
};