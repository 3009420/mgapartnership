/**
 * Created by Dominic on 31-Jul-2014.
 */
var PartnerTokenInfo = function(args){
  var token = {};

    token._id = args._id;
    token.message = null;
    token.email= args.email || null;
    token.name = args.name || null;
    token.institutiontoken = null;
//    token.mailResult = null;

    return token;
};
module.exports = PartnerTokenInfo;