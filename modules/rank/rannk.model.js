const procedure = require('../../database/query/db.query')
const rank = {}
rank.getRank = async (
    type,
    limit,
    offset) => {
    const values = [
        type,
        limit,
        offset
    ]
    
    const results = await procedure.sproc('get_rank',values)
    return results[0]
}

rank.getRankByEvent = async(
    event_id,
    limit,
    offset) => {
        const values = [
            event_id,
            limit,
            offset
        ]
    const results = await procedure.sproc('get_rank_by_event',values);
    return results[0]
}
module.exports = rank;