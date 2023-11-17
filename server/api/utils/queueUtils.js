const Users = require('bull')

const createUsersConnection = (usersName,allUsersConfigs) => {
    const usersConfig = allUsersConfigs.find((config)=>{return config.name===usersName})
    const users = new Users(usersName, usersConfig.url)
    return users
}

const getJobCountsByStatus = async (users)=>{
    const counts = await users.getJobCounts()
    return counts
}

const getUsersJobsByStatus = async (users,...statuses) => {
    const fetchedJobs = statuses.reduce(async (acc,status)=>{
        let jobs=[];
        switch (status){
            case 'all':
                jobs = await users.getJobs();
                return {...acc,all:jobs}
                break;
            case 'completed':
                jobs= await users.getCompleted();
                return {...acc,completed:jobs}
                break;
            case 'failed':
                jobs = await users.getFailed();
                return {...acc,failed:jobs}
                break;
            case 'active':
                jobs = await users.getActive();
                return {...acc,active:jobs}
                break;
            case 'delayed':
                jobs = await users.getDelayed();
                return {...acc,delayed:jobs}
                break;
            case 'waiting':
                jobs = await users.getWaiting(); 
                return {...acc,waiting:jobs}
                break;
        }
    },{});
    return fetchedJobs;
}



const getJobsDetails = async (jobs,state='all')=>{
    const jobsDetailsPromises = jobs.map(async (Monitor)=>{
        const jobState = state === 'all' ? await Monitor.getState() : state
        return {
                jobId : Monitor.id,
                progress :  Monitor.progress(),
                timestamps : {
                    added: new Date(Monitor.timestamp),
                    processed: new Date(Monitor.processedOn),
                    finished: new Date(Monitor.finishedOn)
                },
                attempts : Monitor.attemptsMade + 1,
                data: Monitor.data,
                jobState,
                returnValue: Monitor.returnvalue,
                failedReason: Monitor.failedReason,
                stacktrace: Monitor.stacktrace
        }
    })
    const jobsDetails = Promise.all(jobsDetailsPromises)
    return jobsDetails
}

module.exports = {
    createUsersConnection,
    getUsersJobsByStatus,
    getJobCountsByStatus,
    getJobsDetails
}