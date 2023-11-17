const express = require('express')
const router = express.Router()
const path = require('path')
const getAllUserss = require('./api/routes/getAllUserss')
const viewUsersJobs = require('./api/routes/viewUsersJobs')
const searchByField = require('./api/routes/searchByField')


router.get('/api/getAllUserss',getAllUserss)
router.get('/api/viewUsersJobs/:usersName/:status',viewUsersJobs)
router.get('/api/searchByField/:usersName/:status',searchByField);
router.use('/',express.static(path.join(__dirname, '..','build')));


module.exports = router