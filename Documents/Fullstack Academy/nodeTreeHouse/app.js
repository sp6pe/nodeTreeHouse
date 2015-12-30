//Need way to look at userb adge count and JS points 
// Use Node.js to connect to Treehouse API to get profile info to print out

var profile = require("./profile")
var users = process.argv.slice(2);
users.forEach(profile.get);
