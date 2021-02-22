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


const someQueue = (nameQueue, obj, jobOpts, callback) => {
  const someQueue = new Queue(nameQueue)
  someQueue.add(obj, jobOpts)
}
const setQueue = (someQueue) => {
  setQueues([
    new BullAdapter(someQueue, { readOnlyMode: false }),
  ])

}


module.exports = {setQueues, BullAdapter }
