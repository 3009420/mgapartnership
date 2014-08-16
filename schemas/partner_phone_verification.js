/**
 * Created by Dominic on 30-Jul-2014.
 */

var mongoose = require('mongoose');

var partnerPhoneVerificationTokenSchema = mongoose.Schema({
    _institutionId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'partner'},
    code: {type: String, required: true},
    contact_number : String,
    verified : Boolean,
    createdAt: {type: Date, required: true, default: Date.now, expires: '2m'}
});

partnerPhoneVerificationTokenSchema.methods.createVerificationToken = function (done) {
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


var PartnerPhoneVerification = mongoose.model('partnerphonecode', partnerPhoneVerificationTokenSchema);

module.exports = PartnerPhoneVerification;