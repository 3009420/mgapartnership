/**
 * Created by Dominic on 04-Aug-2014.
 */
var PhoneInfo = function(args){
    var info = {};

    info._id = args._id;
    info.code = args.code || null;
    info.contact_number = args.contact_number;

    info.message = null;

    return info;
};
module.exports = PhoneInfo;