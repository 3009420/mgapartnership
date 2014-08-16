var mongoose =  require('mongoose');

var institutionSchema =  mongoose.Schema({

    name : String,
    address: String,
    village_town_city : String,
    locality_lga: String,
    region_province_state : String,
    country : String,
    contact_person : String,
    email:  {address :String, verified: Boolean},
    contact_number : {number :String, verified: Boolean},
    is_private : Boolean,
    is_facility : Boolean,
    is_nongovernmental : Boolean,
    partnershipState :{type:String, enum :['unverified', 'verified']},
    is_authenticated : Boolean,
    registration_date:{
        type:Date,
        default:Date.now
    }

});

var InstitutionModel  = mongoose.model('institutions', institutionSchema);

module.exports = InstitutionModel;