// all code for the profile getting
var http = require("http");

// print out message
function printMessage(username, badgeCount, points) {
   var message = username + " has " + badgeCount + " total badge(s) and " + points + " points";
   console.log(message);
}

// print out error messages
function printError(error) {
   console.log(error.message);
}

function get(username) {
   // Connect to api url http://teamtreehouse.com/chalkers.json
   var teamtreehouseURLString = "http://teamtreehouse.com/" + username + ".json";
   var request = http.get(teamtreehouseURLString, function(response) {
      // read the data from the response
      var body = "";
      // streams chunks of data as they come in
      response.on("data", function(chunk) {
         body += chunk;
      });
      response.on("end", function() {
         if (response.statusCode === 200) {
            try {
               // parse the data
               var profile = JSON.parse(body);
               // print the data  
               printMessage(username, profile.badges.length, profile.points.JavaScript);
            } catch(error) {
               printError(error);
            }
         } else {
            // status code error
            printError({message: "There was an error getting the profile for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"});
         }
      });
   });

   // connection error
   request.on("error", printError);
}

module.exports.get = get;


