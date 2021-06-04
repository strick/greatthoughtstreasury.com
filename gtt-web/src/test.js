const redis = require('redis');
const dotenv = require('dotenv');
redis.debug_mode = true;
dotenv.config(); 
console.log(process.env.REDISCACHEHOSTNAME);
const client = redis.createClient(process.env.REDISCACHEPORT, process.env.REDISCACHEHOSTNAME, 
    {auth_pass: process.env.REDISCACHEKEY});

const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);


var redisIsReady = false;
client.on('connect', () => {
    console.log('Redis connect')
  })
  .on('ready', () => {
    console.log('Redis ready')
  })
  .on('error', (e) => {
    console.log('Redis ready', e)
  })
  .on('close', () => {
    console.log('Redis close')
  })
  .on('reconnecting', () => {
    console.log('Redis reconnecting')
  })
  .on('end', () => {
    console.log('Redis end')
})


console.log("testing");

client.set("key", "value", redis.print);
client.get("key", function(err, reply){
    console.log("HRE");
});
console.log("Don");
