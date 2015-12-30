var http = require('http');
var https = require("https");
//Print out message
function printMessage(username, badgeCount, point){
    var message = username + " has " + badgeCount + " total badges " + point + " points in JS";
    console.log(message);
}

//print out error messages
function printError(error){
    console.error(error.message);
}

function get(username){
    //Conntect to (http://teamtreehouse.com/username.json)
    var request = https.get("https://teamtreehouse.com/" + username + ".json",  function(response){
        //console.dir(response.statusCode);
        var body = "";        
        //Read the data
        response.on('data', function(chunk) {
            body+= chunk;
      });
        response.on('end',function(){
         if(response.statusCode === 200){
            try{   
                //Parse the data
                var profile = JSON.parse(body); 
                //Print the data
                printMessage(username, profile.badges.length, profile.points.JavaScript)   
            } catch(error){ //parse error 
                printError(error);
            }
         } else{
            //status code error
            printError({message:"There was an error getting profile for " + username + ". (" + http.STATUS_CODES[response.statusCode]+")"});
         } 
        });
    });
    
    //Connection Error 
    request.on('error',printError);
};

module.exports.get = get;

