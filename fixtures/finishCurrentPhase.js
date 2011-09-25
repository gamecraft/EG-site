#!/usr/bin/env node

// parse command line arguments
var argv = require("optimist")
           .default("endpoint", "localhost:3000")
           .argv;
           
var sendRequest = function(data) {
    var request = require("request");
    var options = {
        url: "http://"+argv.endpoint+"/Phase/current/finished",
        method: "PUT",
        body: data,
        headers: {
            "Content-Type": "application/json"
        }    
    };
    request(options,
        function(err, res, body) {
            if(err)
                console.log(err, options);
            else
                console.log(res.statusCode, body);
        });
}

process.stdin.resume();
console.log("Type in data to be JSON parsed and send");
process.stdin.on("data", function(line) {
    try {
        JSON.parse(line);
        process.stdin.pause();
        sendRequest(line);
    } catch(e) {
        console.log("could not parse given data, try again");
    }
});
