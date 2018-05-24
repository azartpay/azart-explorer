/**
* The Settings Module reads the settings out of settings.json and provides
* this information to the other modules
*/

var fs = require("fs");
var jsonminify = require("jsonminify");


//The app title, visible e.g. in the browser window
exports.title = "Azart - Block explorer";

//The url it will be accessed from
exports.address = "explorer.azartpay.com";

// logo
exports.logo = "/images/logo.png";


//The app favicon fully specified url, visible e.g. in the browser window
exports.favicon = "public/favicon.ico";

//Theme
exports.theme = "Flatly";

//The Port ep-lite should listen to
exports.port = 80;


//coin symbol, visible e.g. MAX, LTC, HVC
exports.symbol = "AZART";


//coin name, visible e.g. in the browser window
exports.coin = "Azart";


//This setting is passed to MongoDB to set up the database
exports.dbsettings = {
    "user": "explorerdb",
    "password": "3xp!876gf5767Iuyhiuds23!!",
    "database": "explorerdb",
    "address": "localhost",
    "port": 27017
};


//This setting is passed to the wallet
exports.wallet = {
    "host": "localhost",
    "port": 24127,
    "user": "azartrpc",
    "pass": "op978wd46yo843ymfnybs46gtdc!12eETbyrv6"
};


//Locale file
exports.locale = "locale/en.json",


//Menu items to display
exports.display = {
    "api": true,
    "markets": false,
    "richlist": true,
    "twitter": false,
    "facebook": false,
    "googleplus": false,
    "bitcointalk": false,
    "website": true,
    "slack": false,
    "github": true,
    "search": true,
    "movement": true,
    "network": true
};


//API view
exports.api = {
    "blockindex": 1,
    "blockhash": "0000044ce2afe736c7e6a2d2cf6eedd5f21299f80700aba9e27640582531a78a",
    "txhash": "9b21ce49e532d803c29ee1396871630a0bed298479a9a7323eac50c88941c903",
    "address": "AnMZPcLo12HcUJeAUtSsfVTaUZTm54eGP3"
};

// markets
exports.markets = {
  "coin": "AZART",
  "exchange": "BTC",
  "enabled": ['crex24'],
  "default": "crex24"
};

// richlist/top100 settings
exports.richlist = {
  "distribution": true,
  "received": true,
  "balance": true
};

exports.movement = {
    "min_amount": 100,
    "low_flag": 1000,
    "high_flag": 5000
},

//index
exports.index = {
  "show_hashrate": true,
  "difficulty": "POW",
  "last_txs": 100
};

// twitter
exports.twitter = "yourtwitter";
exports.facebook = "yourfacebook";
exports.googleplus = "yourgoogleplus";
exports.bitcointalk = "yourbitcointalk";
exports.slack = "yourslack";
exports.github = "azartpay";
exports.website = "https://azartpay.com";
exports.confirmations = 6;

//timeouts
exports.update_timeout = 125;
exports.check_timeout = 250;


//genesis
exports.genesis_tx = "9b21ce49e532d803c29ee1396871630a0bed298479a9a7323eac50c88941c903";
exports.genesis_block = "0000044ce2afe736c7e6a2d2cf6eedd5f21299f80700aba9e27640582531a78a";

exports.heavy = false;
exports.txcount = 100;
exports.show_sent_received = true;
exports.supply = "TXOUTSET";
exports.nethash = "getnetworkhashps";
exports.nethash_units = "T";

exports.labels = {};

exports.reloadSettings = function reloadSettings() {
  // Discover where the settings file lives
  var settingsFilename = "settings.json";
  settingsFilename = "./" + settingsFilename;

  var settingsStr;
  try{
    //read the settings sync
    settingsStr = fs.readFileSync(settingsFilename).toString();
  } catch(e){
    console.warn('No settings file found. Continuing using defaults!');
  }

  // try to parse the settings
  var settings;
  try {
    if(settingsStr) {
      settingsStr = jsonminify(settingsStr).replace(",]","]").replace(",}","}");
      settings = JSON.parse(settingsStr);
    }
  }catch(e){
    console.error('There was an error processing your settings.json file: '+e.message);
    process.exit(1);
  }

  //loop trough the settings
  for(var i in settings)
  {
    //test if the setting start with a low character
    if(i.charAt(0).search("[a-z]") !== 0)
    {
      console.warn("Settings should start with a low character: '" + i + "'");
    }

    //we know this setting, so we overwrite it
    if(exports[i] !== undefined)
    {
      exports[i] = settings[i];
    }
    //this setting is unkown, output a warning and throw it away
    else
    {
      console.warn("Unknown Setting: '" + i + "'. This setting doesn't exist or it was removed");
    }
  }

};

// initially load settings
exports.reloadSettings();
