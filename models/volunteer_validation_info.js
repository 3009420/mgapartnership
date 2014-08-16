/**
 * Created by Dominic on 31-Jul-2014.
 */

var VolunteerTokenValidationInfo = function(args){
  var token = {};

    token._id = args._id;
    token._volunteerId = null;
    token.token = args.token;
    return token;
};
module.exports = VolunteerTokenValidationInfo;