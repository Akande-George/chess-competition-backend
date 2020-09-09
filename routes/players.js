const express = require('express')
const router = express.Router()
const verify = require('./verifyToken')
const User = require('../model/User')

router.get('/', verify, async (req, res)=> {
    const players = await User.find({ name })
    res.send(players)
})

module.exports = router