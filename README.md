# DiscordBotTwillioTexting
Uses the twilio (communications api) to allow texting from a discord server.

Use:
  Use a .env file to store discord and twilio information:
    
    ex.
    DISCORD_BOT_TOKEN=12345
    TWILIO_ACCOUNT_SID=12345
    TWILIO_AUTH_TOKEN=12345
  
  Within the config.js add allowed country code for texting:
    
    ex. For Canada
    exports.ALLOWEDCOUNTRIES = ["CA"];
    
  Run using: 
    
    "node ./src/index.js"
    
   
