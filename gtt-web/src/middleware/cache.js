//const mcache = require('memory-cache');
const redis = require('redis');
const { promisifyAll } = require('bluebird');

promisifyAll(redis);


const client = redis.createClient(process.env.REDISCACHEPORT, process.env.REDISCACHEHOSTNAME, 
    {auth_pass: process.env.REDISCACHEKEY});

const cache = function () {
    
    return async (req, res, next) => {
    
 
        let key = '__express__' + req.originalUrl || req.url; 

        let keyFound = false;

        var cachedContent = await client.getAsync(key);

        if(cachedContent){
            res.send(cachedContent);
            return;
        }

        // Not already cached, so if it isn't a 500, then cache and send back.
        // Note:  This will happen last, it's a callback at the end of the response (i.e. code after the res.send = body => { } block will execute 
        // before this)
        res.sendResponse = res.send;
        res.send = (body) => {

            if(res.statusCode != 500){

                client.set(key, body, function(err, reply){
                    
                    if(err) next(err);
                });
                res.sendResponse(body);  
            }
        }   

        next();
    }
} 

module.exports = cache;