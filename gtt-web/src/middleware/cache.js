//const mcache = require('memory-cache');
const redis = require('redis');

// Cache Setup
/*
const client = require("express-redis-cache")({
    host: process.env.REDISCACHEHOSTNAME, 
    port: process.env.REDISCACHEPORT,
    auth_pass: process.env.REDISCACHEKEY
  });*/

  var cacheConnection = redis.createClient(6380, process.env.REDISCACHEHOSTNAME, 
    {auth_pass: process.env.REDISCACHEKEY, tls: {servername: process.env.REDISCACHEHOSTNAME}});
   
  

const cache = function(){

    return async (req, res, next) => {
        next();
    }/*

        let key = '__express__' + req.originalUrl || req.url;               

        // If cache exist, just return that
        await client.get(key, function(error, entries){

            if (error) next(error);
            console.log(entries);
            if(entries.length > 0){
                client.route(key);
                console.log("Cache is here, using it: " + key);
            }
            else {

                res.sendResponse = res.send;
                res.send = (body) => {

                    if(res.statusCode != 500){
                        console.log("No error");                                 
                        res.sendResponse(body);    
                        client.route(key);       
                    }
                    else {
                        console.log("Error");
                    }

                    res.sendResponse(body);        
                }
            }            
        });
        
       next();
    }*/
}

/*
const cache = function(duration){

    return (req, res, next) => {
        let key = '__express__' + req.originalUrl || req.url;
        let cachedBody = mcache.get(key);

        if(cachedBody){
            console.log("USING CACHE");
            res.send(cachedBody);
            return;
        }
        else {
            res.sendResponse = res.send;
            res.send = (body) => {

                if(res.status(200)){
                   console.log("CACHING");
                    //console.log(res);
                    if(duration)
                        mcache.put(key, body, duration * 1000);
                    else
                        mcache.put(key, body);
                        res.sendResponse(body);
                    
                }
                
            }
        }
        next();
    }
}
*/
module.exports = cache;