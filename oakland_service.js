var http = require("http");

var oaklandPublicServiceRequestsJSON = "http://data.oaklandnet.com/resource/quth-gb8e.json";

function printServiceRequest(serviceRequestObject) {
   console.log("Request: " + serviceRequestObject.description + " \n at " + serviceRequestObject.reqaddress.human_address);
}


function fetchServiceRequests(callback) {
   var request = http.get(oaklandPublicServiceRequestsJSON, function(response) {
   // read the data from the response
   var body = "";
   response.on("data", function(chunk) {
      body += chunk;
   });
   response.on("end", function() {
      if (response.statusCode === 200) {
         try {
            var responseArray = JSON.parse(body);
            // print the responsearray
            for (var i = 0; i < responseArray.length; i++) {
               printServiceRequest(responseArray[i]);
            }
         } catch(error) {
            printError(error);
         }
      } else {
         printError({message: "There was an error getting the service request data. " + http.STATUS_CODES[response.statusCode]});
      }
   });
});
}

// print out error messages
function printError(error) {
   console.log(error.message);
}

module.exports.fetchServiceRequests = fetchServiceRequests;