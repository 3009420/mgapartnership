/**
 * Created by Dominic on 14-Jul-2014.
 */
var PartnershipApplication =  function(args){

    var app = {};

    app.name = args.name;
    app.address= args.address;
    app.village_town_city= args.village_town_city;
    app.locality_lga= args.locality_lga;
    app.region_province_state= args.region_province_state;
    app.country= args.country;
    app.contact_person= args.contact_person;
    app.email = args.email || null;
    app.contact_number = args.contact_number || null;

    app.is_private= args.is_private || false;
    app.registration_date = args.registration_date || new Date();

    if(args.is_private){
        app.is_nongovernmental = true;
    }else
    {
        app.is_nongovernmental = false;
    }
    app.is_facility= args.is_facility ||  false;

    app.partnershipState = "unverified";
    app.is_authenticated = false;

    app.status = "pending";

    app.message = null;

    app.institution = null;

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

module.exports = PartnershipApplication;