const mcache = require('memory-cache');


const cache = function(duration){

    return (req, res, next) => {
        let key = '__express__' + req.originalUrl || req.url;
        let cachedBody = mcache.get(key);

        if(cachedBody){
            //console.log('CACHED');
            res.send(cachedBody);
            return;
        }
        else {
            //console.log("NOT CACHEC");
            res.sendResponse = res.send;
            res.send = (body) => {
                if(duration)
                    mcache.put(key, body, duration * 1000);
                else
                    mcache.put(key, body);
                res.sendResponse(body);
            }
        }
        next();
    }
}

module.exports = cache;