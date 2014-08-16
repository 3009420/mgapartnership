/**
 * Created by Dominic on 31-Jul-2014.
 */
var VolunteerTokenInfo = function(args){
  var token = {};

    token._id = args._id;
    token.message = null;
    token.email= args.email || null;
    token.firstName = args.firstName || null;
    token.volunteertoken = null;
//    token.mailResult = null;

    return token;
};
module.exports = VolunteerTokenInfo;