/**
 * Created by Dominic on 30-Jul-2014.
 */

var mongoose = require('mongoose');

var VolunteerVerificationTokenSchema = mongoose.Schema({
    _volunteerId: {type: ObjectId, required: true, ref: 'volunteers'},
    token: {type: String, required: true},
    createdAt: {type: Date, required: true, default: Date.now, expires: '4h'}
});

var uuid = require('node-uuid');
VolunteerVerificationTokenSchema.methods.createVerificationToken = function (done) {
    var verificationToken = this;
    var token = uuid.v4();
    verificationToken.set('token', token);
    verificationToken.save( function (err) {
        if (err) return done(err);
        return done(null, token);
        console.log("Verification token", verificationToken);
    });
};

module.exports = VolunteerVerificationTokenSchema;