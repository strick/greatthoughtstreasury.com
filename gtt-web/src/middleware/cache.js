//const mcache = require('memory-cache');
const redis = require('redis');
const { promisifyAll } = require('bluebird');

promisifyAll(redis);


const client = redis.createClient(parseInt(process.env.REDISCACHEPORT), process.env.REDISCACHEHOSTNAME, 
    {auth_pass: process.env.REDISCACHEKEY});


console.log(`Connection to Redis with: ${parseInt(process.env.REDISCACHEPORT)} and ${process.env.REDISCACHEHOSTNAME} and ${process.env.REDISCACHEKEY}`);
/*

const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
*/
var redisIsReady = false;
client.on('error', function(err) {
    redisIsReady = false;
    console.log('redis is not running');
    console.log(`Connection to Redis with: ${process.env.REDISCACHEPORT} and ${process.env.REDISCACHEHOSTNAME} and ${process.env.REDISCACHEKEY}`);
    console.log(err);
});
client.on('ready', function() {
    redisIsReady = true; 
    console.log('REDIS IS RUNNING');
    console.log(`Connection to Redis with: ${process.env.REDISCACHEPORT} and ${process.env.REDISCACHEHOSTNAME} and ${process.env.REDISCACHEKEY}`);
});

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