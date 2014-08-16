/**
 * Created by Dominic on 14-Jul-2014.
 */

var mongoose =  require('mongoose');

var volunteerSchema =  mongoose.Schema({

    firstName: String,
    surname : String,
    otherNames : String,
    gender : {type:String, enum :['Male', 'Female']},
    birthDate : Date,
    address: String,
    village_town_city: String,
    locality_lga: String,
    region_province_state: String,
    country: String,
    email:  {address :String, verified: Boolean},
    contact_number : {number :String, verified: Boolean},
    registrationDate : {
        type:Date,
        default:Date.now
    },

    partnershipState :{type:String, enum :['unverified', 'verified']},
    is_authenticated : Boolean

});

var Volunteer = mongoose.model('volunteer', volunteerSchema);

module.exports = Volunteer;