require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var userCommand = process.argv[2];

var runUserCommand = function() {
    
}