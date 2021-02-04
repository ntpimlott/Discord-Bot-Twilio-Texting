exports.validate = function(arg){
    const CONFIG = require("./config/config.js");
    const TWILIOCLIENT = require('twilio')(CONFIG.twilio.ACCOUNT_SID, CONFIG.twilio.AUTH_TOKEN);

    return new Promise((resolve, reject) => {
        TWILIOCLIENT.lookups.phoneNumbers(arg)
            .fetch()
            .then((response) => {
                response = response.countryCode;
                console.log(response);
                if(CONFIG.ALLOWEDCOUNTRIES.includes(response) == true){
                    console.log("RETURNS TRUE");
                    resolve(true);
                    return;
                }
                else {
                    console.log("RETURNS FALSE");
                    resolve(false);
                    return;
                }
            })
            .catch((err) => {
                console.log(err + "ERROR");
                reject(false);
                return;
            });
    });

}
