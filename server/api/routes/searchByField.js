const Users = require('bull')
const Redis = require('ioredis')
const search = require('../utils/deepSearchKeyValue')
const usersUtils = require('../utils/usersUtils')

const handler=async (req,res)=>{
    const {usersName,status} = req.params;
    const {skey,sval} = req.query
    const Userss = req.app.locals.MonitoroUserss
    const users = usersUtils.createUsersConnection(usersName,Userss);
    const jobs = await usersUtils.getUsersJobsByStatus(users,status)
    const matchingJobs=jobs[status].filter(Monitor=>search(Monitor.data,skey,sval))
    const allJobsDetails = await usersUtils.getJobsDetails(matchingJobs)
    users.close()
    return res.json(allJobsDetails)
}

module.exports = handler
