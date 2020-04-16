const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchSchema = new Schema({
    matchWeek: Number,
    date: String,
    location: String,
    homeTeam: String,
    awayTeam: String,
    homeTeamScore: Number,
    awayTeamScore: Number,
    homeTeamLineup: [String],
    awayTeamLineup: [String]
});

module.exports = mongoose.model('Match', matchSchema);