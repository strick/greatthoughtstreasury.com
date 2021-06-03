//const mcache = require('memory-cache');

// Cache Setup
var cache = require("express-redis-cache")({
    host: process.env.REDISCACHEHOSTNAME, 
    port: process.env.REDISCACHEPORT,
    auth_pass: process.env.REDISCACHEKEY
  });
  

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