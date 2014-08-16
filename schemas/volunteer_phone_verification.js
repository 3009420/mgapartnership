/**
 * Created by Dominic on 30-Jul-2014.
 */

var mongoose = require('mongoose');

var volunteerPhoneVerificationTokenSchema = mongoose.Schema({
    _volunteerId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'volunteer'},
    code: {type: String, required: true},
    contact_number : String,
    verified : Boolean,
    createdAt: {type: Date, required: true, default: Date.now, expires: '2m'}
});

volunteerPhoneVerificationTokenSchema.methods.createVerificationToken = function (done) {
    var verificationToken = this;
    var speakeasy = require('speakeasy');
    var token = speakeasy.hotp({key: 'secret', counter:582});
    verificationToken.set('code', token);
    verificationToken.set('verified', false);
    verificationToken.save( function (err) {
        if (err) return done(err);
        return done(null, token);
       // console.log("Verification token", verificationToken);
    });
};


var VolunteerPhoneVerification = mongoose.model('volunteerphonecode', volunteerPhoneVerificationTokenSchema);

module.exports = VolunteerPhoneVerification;