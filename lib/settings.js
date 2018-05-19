/**
* The Settings Module reads the settings out of settings.json and provides
* this information to the other modules
*/

var fs = require("fs");
var jsonminify = require("jsonminify");


//The app title, visible e.g. in the browser window
exports.title = "blockchain";

//The url it will be accessed from
exports.address = "explorer.example.com";

// logo
exports.logo = "/images/logo.png";


//The app favicon fully specified url, visible e.g. in the browser window
exports.favicon = "favicon.ico";

//Theme
exports.theme = "Flatly";

//The Port ep-lite should listen to
exports.port = process.env.PORT || 3001;


//coin symbol, visible e.g. MAX, LTC, HVC
exports.symbol = "POLIS";


//coin name, visible e.g. in the browser window
exports.coin = "Polis";


//This setting is passed to MongoDB to set up the database
exports.dbsettings = {
  "user": "iquidus",
  "password": "3xp!0reR",
  "database": "blockchaindb",
  "address" : "localhost",
  "port" : 27017
};


//This setting is passed to the wallet
exports.wallet = { "host" : "127.0.0.1",
  "port" : 24127,
  "user" : "polisrpc",
  "pass" : "password"
};


//Locale file
exports.locale = "locale/en.json",


//Menu items to display
exports.display = {
  "api": true,
  "market": true,
  "twitter": true,
  "facebook": false,
  "googleplus": false,
  "bitcointalk": false,
  "website": false,
  "slack": false,
  "github": false,
  "search": true,
  "richlist": true,
  "movement": true,
  "network": true
};


//API view
exports.api = {
  "blockindex": 1337,
  "blockhash": "000000000000108997e8825291a6321bf685c9e0e4c2d68c301599624e341b4b",
  "txhash": "b1709f4e3c1ef896e642eb4b7a34484e476e9ce96adb59598850891a116783f2",
  "address": "P9mF5y8rLNJwXX883CuJL2nnu6AXjZ8Vjs",
};

// markets
exports.markets = {
  "coin": "POLIS",
  "exchange": "BTC",
  "enabled": ['cryptopia'],
  "cryptopia_id": "",
  "default": "cryptopia"
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
  "high_flag": 10000
},

//index
exports.index = {
  "show_hashrate": false,
  "difficulty": "POW",
  "last_txs": 100
};

// twitter
exports.twitter = "PolisBlockChain";
exports.facebook = "polisblockchain";
exports.googleplus = "yourgooglepluspage";
exports.bitcointalk = "yourbitcointalkurl";
exports.slack = "yourslackinviteurl";
exports.github = "yourgithuburl";
exports.website = "yourcompletewebsiteurlincludingtheprotocol";
exports.confirmations = 6;

//timeouts
exports.update_timeout = 125;
exports.check_timeout = 250;


//genesis
exports.genesis_tx = "5dc9bcf5d1e4802dad0045a88849e3ad97d07a5b8aaee1114ed5ae03b98c4bfc";
exports.genesis_block = "000009701eb781a8113b1af1d814e2f060f6408a2c990db291bc5108a1345c1e";

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
