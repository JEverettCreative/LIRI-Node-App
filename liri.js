require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

var userCommand = process.argv[2];

var arg = process.argv[3];

var runUserCommand = function() {
    if (userCommand === "spotify-this-song") {
        console.log("Testing this function");
        spotify.search({type: 'track', query: arg, limit: 5})
        .then(function(response) {
            for (var i = 0; i < response.tracks.items.length; i++) {
                console.log("Artist/Band: " + response.tracks.items[i].artists[0].name);
            }
            // console.log(JSON.stringify(response, null, 2));
        })
        .catch(function(err) {
            console.log(err);
        });
    }
}


runUserCommand();