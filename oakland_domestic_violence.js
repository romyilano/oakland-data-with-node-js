/*
Crimewatch
Past 90 days
https://data.oaklandnet.com/Public-Safety/CrimeWatch-Maps-Past-90-Days/ym6k-rx7a
*/

var http = require("http");
var _ = require("underscore");

var oakland_crimewatch_endpoint_url = "http://data.oaklandnet.com/resource/ym6k-rx7a.json";

function printIncident(crimeIncident) {
   console.log(crimeIncident.crimetype + " : " + crimeIncident.Description);
}

function fetchdata(cb) {
   var request = http.get(oakland_crimewatch_endpoint_url, function(response) {
      var body = "";
      response.on("data", function(chunk) {
      body += chunk;
   });
   response.on("end", function() {
      if (response.statusCode === 200) {
         try {
            var responseArray = JSON.parse(body);
            cb(null, responseArray);
         } catch(error) {
           cb(error, null);
         }
      } else {
         console.log("response code is: " + response.statusCode);
      }
   });
});
}

function printDomesticViolenceIncidentsTotal() {
   console.log("Oakland Crimewatch - the past 90 days");
   printIncidentsByPoliceBeat("DOMESTIC VIOLENCE");
}

function printIncidentsByPoliceBeat(crimeType){
   var crimes = fetchdata(function (error, responseArray) {
      if (error == null) {
         var crimeTotals = {};
         _.each(responseArray, function(crimeIncident) {
            var crimeTypeValue = crimeIncident.crimetype;
            var policeBeat = crimeIncident.policebeat;
            if (crimeTypeValue === crimeType) {
               if (crimeTotals[policeBeat]) {
                  crimeTotals[policeBeat]++;
               } else {
                  crimeTotals[policeBeat] = 1;
               }
            }
         });
         for (var key in crimeTotals) {
            console.log("Police Precinct " + key + " : "  + crimeTotals[key] + " domestic violence incidents");
         }
      } else {
         print(error);
      }
   });
}

function printError(error) {
   console.log(error.message);
}

module.exports.printIncidentsByPoliceBeat = printIncidentsByPoliceBeat;
module.exports.printDomesticViolenceIncidentsTotal = printDomesticViolenceIncidentsTotal;