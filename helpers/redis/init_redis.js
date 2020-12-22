const redis = require('redis')

const client = redis.createClient({
    port:6379,
    host:"127.0.0.1"
})


client.on('connect',() =>{
    console.log('client  connected redis ...');
})
client.on('ready',() =>{
    console.log(' client connected redis and ready to use ...');
})

client.on('end',()=>{
    console.log('client disconnected redis ...');  
})
client.on("error", function(error) {
    console.error(error);
  });

module.exports = client;