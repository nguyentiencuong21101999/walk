const procedure = require('../../database/query/db.query')
const rank = {}
rank.getRankByDay = () =>{
    return procedure.sproc('get_rank_by_day',[]);
}
rank.getRankByMonth = () =>{
    return procedure.sproc('get_rank_by_month',[]);
}
rank.getRankByEvent = (event_id) =>{
    return procedure.sproc('get_rank_by_event',[event_id]);
}
module.exports = rank;