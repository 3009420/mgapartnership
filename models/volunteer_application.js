/**
 * Created by Dominic on 14-Jul-2014.
 */
var VolunteerApplication =  function(args){

    var app = {};

    app.firstName = args.firstName;
    app.surname = args.surname;
    app.otherNames = args.otherNames;
    app.gender = args.gender;
    app.birthDate = args.birthDate;
    app.address= args.address;
    app.village_town_city= args.village_town_city;
    app.locality_lga= args.locality_lga;
    app.region_province_state= args.region_province_state;
    app.country= args.country;
    app.email= args.email;
    app.contact_number= args.contact_number;
    app.registration_date = args.registration_date || new Date();

    app.partnershipState = "unverified";
    app.is_authenticated = false;

    app.status = "pending";

    app.message = null;

    app.volunteer = null;


    app.isValid = function(){
        return self.status == "validated";
    };
    app.isInvalid = function(){
        return !isValid();
    };

    app.setInvalid = function(message){
        app.status = "invalid";
        app.message = message;
    };
    app.validate = function(){
        app.status = "validated";
    };

    return app;

};

module.exports = VolunteerApplication;