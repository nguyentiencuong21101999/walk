//#region 
// const Queue = require('bull');
// const {bar:barWorker,barEntrace:barEntranceWorker } = require('./worker/index')
// const redisConf = require('./configs/redis.config')
// const bar = new Queue('bar', { redis: { redisConf } })
// const barEntrance = new Queue('bar-entrance', { redis: { redisConf } })
// const cluster = require('cluster');

// bar.process((job, done) => barWorker(job,done))
// barEntrance.process((job, done) => barEntranceWorker(job,done))

// module.exports = { bar,barEntrance }; 
//#endregion
const Queue = require('bull')
const { setQueues, BullAdapter } = require('bull-board')
const { name } = require('ejs')
const procedure = require("../../database/query/db.query")


const createQueue = (nameQueue) =>{
  return new Queue(nameQueue,
    {
      limiter:{
        max:10,
        duration:1
      }
    })
}
const addElementToQueue = (nameQueue,obj) =>{
   Queue(nameQueue).add(obj,{
    delay:1000
  })
}
const processQueue = (nameQueue,store) =>{
   Queue(nameQueue).process(async(job,jobDone) =>{
    const values = compareEntries(job.data);
    await procedure.sproc(store,values);
    job.progress(100);
    jobDone()
  })
}
const compareEntries = (obj) =>{
  const arr = []
   Object.entries(obj).map(([key,value]) =>{
     arr.push(value)
  })
  return arr;
}

const setQueue = (nameQueue) => {
  setQueues([
    new BullAdapter(createQueue(nameQueue), { readOnlyMode: false }),
  ])

}


module.exports = {setQueues, BullAdapter,
  addElementToQueue, 
  processQueue,
  setQueue
}
