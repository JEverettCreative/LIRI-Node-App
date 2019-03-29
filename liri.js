require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var moment = require("moment");

var userArgs = process.argv;

var userCommand = process.argv[2];

var arg = "";

var runUserCommand = function() {
    for (var x = 3; x < userArgs.length; x++) {
        if (x > 3 && x < userArgs.length) {
            arg = arg + "+" + userArgs[x];
        } else {
            arg += userArgs[x];
        }
    }

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

    if (userCommand === "concert-this") {
        var queryURL = "https://rest.bandsintown.com/artists/" + arg + "/events?app_id=codingbootcamp";

        axios.get(queryURL)
            .then(function(response) {
                console.log(arg + " is playing the following shows: ");
                for (var i = 0; i < response.data.length; i ++) {
                    
                    console.log("Venue: " + response.data[i].venue.name);
                    console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                    console.log(moment(response.data[i].datetime).format("MM/DD/YYYY"));
                    console.log("\n-----------------");
                }
            });
    }

    if (userCommand === "movie-this") {
        var queryURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + arg;

        axios.get(queryURL)
            .then(function(response) {
                    console.log("\n---------------------");
                    console.log("Title: " + response.data.Title);
                    console.log("Release: " + response.data.Year);
                    console.log("IMDb Rating: " + response.data.imdbRating);
                    console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
                    console.log("Country of Production: " + response.data.Country);
                    console.log("Language: " + response.data.Language);
                    console.log("Plot: " + response.data.Plot);
                    console.log("Actors: " + response.data.Actors);
                    console.log("\n---------------------");
            });
    }
}


runUserCommand();