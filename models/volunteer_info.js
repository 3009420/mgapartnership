/**
 * Created by Dominic on 14-Jul-2014.
 */
    var assert = require('assert');
var Volunteer =  function(args){

    var volunteer = {};
    
    assert.ok(args.firstName, "Volunteer first name is required");
    assert.ok(args.surname, "Volunteer surname is required");
    assert.ok(args.gender, "Volunteer gender is required");
    assert.ok(args.birthDate, "Volunteer date of birth is required");
    assert.ok(args.address, "Address  is required");
    assert.ok(args.country, "Country is required");
    assert.ok(args.locality_lga, "Name of primary location is required");
    assert.ok(args.region_province_state, "Region or province or state of primary is required");
//    assert.ok(args.email && args.contact_number, "Contact Email or Phone Number is required");

    assert.ok(args.partnershipState, "Partnership State must be specified");

    
    

    volunteer.firstName = args.firstName;
    volunteer.surname = args.surname;
    volunteer.otherNames = args.otherNames;
    volunteer.gender = args.gender;
    volunteer.birthDate = args.birthDate;
    volunteer.address= args.address;
    volunteer.village_town_city= args.village_town_city;
    volunteer.locality_lga= args.locality_lga;
    volunteer.region_province_state= args.region_province_state;
    volunteer.country= args.country;
    volunteer.email = { address: args.email || null};
    volunteer.contact_number = { number:args.contact_number || null};
    volunteer.registrationDate = args.registrationDate || new Date();

    volunteer.partnershipState = "unverified";
    volunteer.is_authenticated = false;

   

    return volunteer;

};

module.exports = Volunteer;