// Problem: we need a simple way to look at a user's badge count
// and javascript points
var profile = require("./profile.js"); // can also write profile without js
var oakland_service = require("./oakland_service.js");
var oakland_budget = require("./oakland_budget.js");
var oakland_domestic_violence = require("./oakland_domestic_violence.js");
var express = require('express');
var app = express();

var username = "romyilano"; 

// console.dir(process.argv);
var commandInput = process.argv.slice(2);

if (commandInput[0] === "treehouse") {
   var users = commandInput.slice(1);
   console.log(users);
   users.forEach(profile.get);
} else if (commandInput[0] === "oakland_service") {
   oakland_service.fetchServiceRequests();
} else if (commandInput[0] === "oakland_budget") {
   oakland_budget.printNumberOfAccountTypes();
} else if (commandInput[0] === "oakland_domestic_violence") {
   oakland_domestic_violence.printDomesticViolenceIncidentsTotal();
}
