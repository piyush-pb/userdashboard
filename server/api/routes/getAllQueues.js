const usersUtils = require('../utils/usersUtils')

const handler= async (req,res)=>{
    const Userss = req.app.locals.MonitoroUserss
    const totalUserssConnected = Userss.length
    let totalActiveJobs = 0
    let totalCompletedJobs = 0
    let totalFailedJobs = 0 
    let totalWaitingJobs = 0
    let totalDelayedJobs = 0
    const allUserssPromises =  Userss.map(async (usersConfig)=>{
        const users = usersUtils.createUsersConnection(usersConfig.name,Userss)
        const usersOverview = await usersUtils.getJobCountsByStatus(users)
        totalActiveJobs += usersOverview.active
        totalCompletedJobs += usersOverview.completed
        totalFailedJobs += usersOverview.failed
        totalWaitingJobs += usersOverview.waiting
        totalDelayedJobs += usersOverview.delayed
        await users.close()
        return {name:usersConfig.name,usersOverview}
    })    
    const allUserss = await Promise.all(allUserssPromises)
    return res.json({allUserss,totalUserssConnected,totalActiveJobs,totalCompletedJobs,totalFailedJobs,totalWaitingJobs,totalDelayedJobs})
}

module.exports = handler