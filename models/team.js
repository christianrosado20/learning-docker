const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    name: String,
    badge: String,
    matchesPlayed: Number,
    matchesWon: Number,
    matchesDraw: Number,
    matchesLost: Number,
    goalsScored: Number,
    goalsScoredAgainst: Number
});

module.exports = mongoose.model('Team', teamSchema);