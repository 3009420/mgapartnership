/**
 * Created by Dominic on 31-Jul-2014.
 */
var PartnerTokenInfo = function(args){
  var token = {};

    token._id = args._id;
    token.message = null;
    token.email= args.email;
    token.name = args.name;
    token.institutiontoken = null;
};
module.exports = PartnerTokenInfo;