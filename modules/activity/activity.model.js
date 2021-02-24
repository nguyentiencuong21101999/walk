
const Queue = require('bull')
const { setQueues, BullAdapter } = require('../../queue')
const procedure = require('../../database/query/db.query');
const activity = {};
// add activity
activity.addActivity = async (
    steps_number,
    time_begin,
    time_end,
    user_id) => {
    const values = [
        steps_number,
        time_begin,
        time_end,
        user_id
    ]
    const results = await procedure.sproc("add_activity", values);
    let activity_id = results[1];
    console.log(activity_id[0]);
    if (results[0].length > 0) {
        results[0].map(async element => {
            if (
                new Date(time_begin) > new Date(element.time_join) &&
                new Date(time_begin) > new Date(element.time_begin) &&
                new Date(time_end) < new Date(element.time_end)
            ) {
                const someQueue = new Queue("add_activity_event")

                const obj = {
                    activity_id: activity_id[0].activity_id,
                    event_id: element.event_id
                }
                const jobOpts = {
                    delay: 5000
                }
                someQueue.add(obj, jobOpts)

                someQueue.process(async (job, jobDone) => {
                    const { event_id, activity_id } = job.data
                    await procedure.sproc("add_activity_event", [event_id, activity_id])
                    job.progress(100)
                    jobDone()
                })
                setQueues([
                    new BullAdapter(someQueue, { readOnlyMode: true }), // only this queue will be in read only mode
                ]);
            }
            //#region 
            // if( new Date(time_begin) > element.time_join  && new Date(time_begin) > element.time_begin && new Date(time_end) < element.time_end){
            //     await procedure.sproc("add_activity_event",[element.event_id,activity_id[0].activity_id])
            // }
            //#endregion
        })
    }

}
// get steps day by user_id
activity.getAcitivity = async (
    user_id,
    type) => {
    const values = [
        user_id,
        type
    ]
    const results = await procedure.sproc("get_activity", values);
    if (results[0].length > 0) {
        return results
    }
}

// get steps  event by user_id  and event id
activity.getActivityByEvent = async (
    user_id,
    event_id) => {
    const values = [
        user_id,
        event_id
    ]
    const results = await procedure.sproc("get_activity_by_event", values);
    if (results[0].length > 0) {
        return results[0]
    }
}


module.exports = activity;