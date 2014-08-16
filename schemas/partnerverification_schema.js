/**
 * Created by Dominic on 30-Jul-2014.
 */

var mongoose = require('mongoose');

var uuid = require('node-uuid');

//var Institution = require('./institutionschema');


var partnerVerificationTokenSchema = mongoose.Schema({
    _institutionId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'institution'},
    token: {type: String, required: true},
    createdAt: {type: Date, required: true, default: Date.now, expires: '4h'}
});



partnerVerificationTokenSchema.methods.createVerificationToken = function (done) {
    var verificationToken = this;
    var token = uuid.v4();
    verificationToken.set('token', token);
    verificationToken.save( function (err) {
        if (err) return done(err);
        return done(null, token);
//        console.log("Verification token", verificationToken);
    });
};

var PartnerVerificationToken = mongoose.model('partnertoken', partnerVerificationTokenSchema);
//var InstitutionModel = new Institution();

module.exports = PartnerVerificationToken;