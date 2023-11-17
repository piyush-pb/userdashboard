const Users = require('bull')
const Redis = require('ioredis')
const usersUtils = require('../utils/usersUtils')

const handler = async (req,res)=>{
    const {usersName,status} = req.params
    const Userss = req.app.locals.MonitoroUserss
    const users = usersUtils.createUsersConnection(usersName,Userss)
    const allJobCountsByStatus = await usersUtils.getJobCountsByStatus(users)
    const jobs = await usersUtils.getUsersJobsByStatus(users,status)
    const allJobsDetails = await usersUtils.getJobsDetails(jobs[status])
    const {redis_version,connected_clients,blocked_clients,total_system_memory_human,used_memory_human} = users.client.serverInfo
    const redisStats = {
        "Redis Version":redis_version,
        "Connected Clients":connected_clients,
        "Blocked Clients":blocked_clients,
        "Total System Memory":total_system_memory_human,
        "Used Memory":used_memory_human
    }
    await users.close();
    return res.json({allJobCountsByStatus,allJobsDetails,redisStats})
}

module.exports = handler