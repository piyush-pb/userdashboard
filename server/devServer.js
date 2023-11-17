
const express = require('express')
const app = express()
const port = 9000
const dashboardRouter = require('./router')
const dashboardUserss = [
    { 
      "name": "Users1", 
      "hostId": "redis",
      "url": "redis://localhost:6379" 
    },
    { 
      "name": "Users2", 
      "hostId": "redis",
      "url": "redis://localhost:6379" 
    },
    { 
      "name": "Users3", 
      "hostId": "redis",
      "url": "redis://localhost:6379" 
    },
    { 
      "name": "Users4", 
      "hostId": "redis",
      "url": "redis://localhost:6379" 
    },
    { 
      "name": "Users5", 
      "hostId": "redis",
      "url": "redis://localhost:6379" 
    }
]

app.locals.MonitoroUserss = dashboardUserss
app.use('/',dashboardRouter)
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})