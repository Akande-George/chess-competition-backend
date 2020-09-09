const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    nickName: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    games: {
        type: String,
        default: 0
    },
    wins: {
        type: String,
        default: 0
    },
    loses: {
        type: String,
        default: 0
    },
    draws: {
        type: String,
        default: 0
    }
})

module.exports = mongoose.model('User', userSchema)