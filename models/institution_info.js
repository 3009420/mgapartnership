var assert = require('assert');

var Institution =  function(args) {
    var institution = {};


    assert.ok(args.name, "Institution name is required");
    assert.ok(args.address, "Institution address  is required");
    assert.ok(args.country, "Country is required");
    assert.ok(args.locality_lga, "Name of primary location is required");
    assert.ok(args.region_province_state, "Institution region or province or state of primary location is required");
    assert.ok(args.email && args.contact_number, "Contact Email and Phone Number is required");
    assert.ok(args.contact_person, "Name of contact person for Institution is required");
    assert.ok(args.partnershipState, "Partnership State must be specified");


    institution.name = args.name;
    institution.address = args.address;
    institution.village_town_city = args.village_town_city;
    institution.locality_lga = args.locality_lga;
    institution.region_province_state = args.region_province_state;
    institution.country = args.country;
    institution.contact_person = args.contact_person;
    institution.email = args.email;
    institution.contact_number = args.contact_number;
    institution.is_private = args.is_private;
    institution.is_facility = args.is_facility;
    institution.is_nongovernmental = args.is_nongovernmental;
    institution.partnershipState = args.partnershipState;
    institution.is_authenticated = args.is_authenticated;
    institution. registration_date = args.registration_date;

    return institution;

};
module.exports = Institution;