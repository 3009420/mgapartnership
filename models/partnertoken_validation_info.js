/**
 * Created by Dominic on 31-Jul-2014.
 */
var PartnerTokenValidationInfo = function(args){
  var token = {};

    token._id = args._id;
    token._institutionId  = null;
    token.token = args.token;
    return token;
};
module.exports = PartnerTokenValidationInfo;