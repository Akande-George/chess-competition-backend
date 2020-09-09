const express = require('express')
const router = express.Router()
const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {registerValidation, loginValidation} = require('../validation/validation')

router.post('/register', async (req, res, next)=> {
    const {error} = registerValidation(req.body)
    if(error) {
        return res.status(400).send('bad request')
    }

    // checking if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist) {
        return res.status(400).send('sorry email exists already')
    }

    // to hash password
    const salt = await bcrypt.genSaltSync(10)
    const hash =  await bcrypt.hashSync(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        nickName: req.body.nickName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        password: hash
    })
    try {
        const savedUser = await user.save()
        res.send({user: user._id})

    } catch (err) {
        res.status(400).send(err)
        console.log(err)
        next()
    }
})

router.post('/login', async (req, res, next)=> {
    const {error} = loginValidation(req.body)
    if(error) {
        return res.status(400).send('bad request')
    }

    // checking if the user is already in the database
    const user = await User.findOne({email: req.body.email})
    if(!user) {
        return res.status(400).send('email or password is wrong')
    }
    // check password
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send('Invalid Password')
    const token = jwt.sign({_id: user._id}, 'akandemekaforegeorge')
    res.header('auth-token', token).send(token)
})


module.exports = router