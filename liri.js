require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

var userCommand = process.argv[2];

var arg = process.argv[3];

var runUserCommand = function() {
    if (userCommand === "spotify-this-song") {
        if (arg) {
            spotify.search({type: 'track', query: arg, limit: 5})
            .then(function(response) {
                for (var i = 0; i < response.tracks.items.length; i++) {
                    console.log("Result " + (i + 1));
                    console.log("Artist/Band: " + response.tracks.items[i].artists[0].name);
                    console.log("Song Title: " + response.tracks.items[i].name);
                    console.log("Preview Link: " + response.tracks.items[i].preview_url);
                    console.log("Album Title: " + response.tracks.items[i].album.name);
                    console.log("\n-----------------\n");

                }
            })
            .catch(function(err) {
                console.log(err);
            });
        }
        else if (!arg) {
            console.log("\n");
            // Default on blank to "The Sign"
            spotify.request("https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE")
            .then(function(response) {  
                    
                    console.log("Artist/Band: " + response.artists[0].name);
                    console.log("Song Title: " + response.name);
                    console.log("Preview Link: " + response.preview_url);
                    console.log("Album Title: " + response.album.name);
                    console.log("\n-----------------\n");
            })
            .catch(function(err) {
                console.log(err);
            });
        }
    }
}


runUserCommand();