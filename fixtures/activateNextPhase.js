#!/usr/bin/env node

// parse command line arguments
var argv = require("optimist")
           .default("endpoint", "localhost:3000")
           .argv;
           
var request = require("request");
var options = {
    url: "http://"+argv.endpoint+"/Phase/next/active",
    method: "PUT",
    body: "",
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
