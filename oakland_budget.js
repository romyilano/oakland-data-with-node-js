/*
Proposed Budget for Fiscal Years
2015-2016
https://data.oaklandnet.com/Financial/Proposed-Budget-for-Fiscal-Years-2015-2017/w4j2-chmt
*/

var http = require("http");
var _ = require("underscore");

var oaklandBudgetEndpointURL = "http://data.oaklandnet.com/resource/w4j2-chmt.json";

function printBudgetItem(budgetItem) {
   console.log("=======");
   console.log("Account Description: " + budgetItem.account_description);
   console.log("$" + budgetItem.value + " : " + budgetItem.fund_description);
}

function fetchBudgetData(cb) {
   var request = http.get(oaklandBudgetEndpointURL, function(response) {
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

function printNumberOfAccountTypes() {
   var budgetDataArray = fetchBudgetData(function (error, responseArray) {
      if (error == null) {
         var budgetTotals = {};
         _.each(responseArray, function(budgetItem) {
            var department = budgetItem.department;
            var value = parseInt(budgetItem.value);
            if (budgetTotals[department]) {
               budgetTotals[department] += value;
            } else {
               budgetTotals[department] = value;
            }
         });

         for (var key in budgetTotals) {
            console.log(key+ " : " + "$" + budgetTotals[key]);
         }
      } else {
         console.log(error.message);
      }
   });
}

function printError(error) {
   console.log(error.message);
}

module.exports.printNumberOfAccountTypes = printNumberOfAccountTypes;
module.exports.fetchBudgetData = fetchBudgetData;