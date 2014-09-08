/**
 * Created by Dominic on 11-Aug-2014.
 */

var VolunteerModel = require('../schemas/volunteerschema');

exports.getVolunteer = function(args, done){

    if(args) {

        VolunteerModel.findOne(args,
            function (err, foundVolunteer) {
                if (err) {
                  return done(err, null);
                }
                if (foundVolunteer) {

                   return done(null, foundVolunteer);
                }
                return done(null, null);
            });

    }
    else{
        return done(null, null);
    }
};

exports.getVolunteerById = function(args, done){

    if(args && args._id) {
        VolunteerModel.findOne(
            {_id:args._id},
            function (err, foundVolunteer) {
                if (err) {
                    return done(err, null);
                }
                if (foundVolunteer) {
                    return done(null, foundVolunteer);
                }
                return done(null, null);
            });

    }else
        return done(null, null);
};

exports.getVolunteers = function(args, done){

    if(args) {
        VolunteerModel.find(
            args,
            function (err, foundVolunteers) {
                if (err) {
                    return done(err, null);
                }
                if (foundVolunteers) {
                    return done(null, foundVolunteers);
                }

                return done(null, null);
            });

    }else
        return done(null, null);
};


exports.volunteerEmailExist = function(args, done){

    if(args) {
        VolunteerModel.findOne(
            {
                email:{
                    address:partnershipApp.email
                }
            },
            function (err, volunteer) {
                if (err) {
                    return done(err, null);
                }
                if (volunteer) {
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