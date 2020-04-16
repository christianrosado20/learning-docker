const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    name: String,
    age: Number,
    goals: Number,
    assists: Number,
    yellowCards: Number,
    redCards: Number,
    matchAppearances: Number,
    teamId: String,
});

module.exports = mongoose.model('Player', playerSchema);