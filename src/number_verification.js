exports.validate = function(arg){
    const CONFIG = require("./config/config.js");
    const TWILIOCLIENT = require('twilio')(CONFIG.twilio.ACCOUNT_SID, CONFIG.twilio.AUTH_TOKEN);

    return new Promise((resolve, reject) => {
        TWILIOCLIENT.lookups.phoneNumbers(arg)
            .fetch()
            .then((response) => {
                response = response.countryCode;
                if(CONFIG.ALLOWEDCOUNTRIES.includes(response) == true){
                    resolve(true);
                    return;
                }
                else {
                    resolve(false);
                    return;
                }
            })
            .catch((err) => {
                reject(false);
                return;
            });
    });

}
