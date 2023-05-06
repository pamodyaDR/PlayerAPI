const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

//Create Schema
const PlayerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    role:{
        type:String,
        default: "Player"
    },
    date: {
        type: Date,
        default: Date.now() + 5.5*60*60*1000
    },
    score : {
        type: Number,
        default: 0
    }
});

module.exports = Player = mongoose.model('player',PlayerSchema);