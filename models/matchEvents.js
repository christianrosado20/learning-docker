const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchEventSchema = new Schema({
    homeTeamGoals: [String],
    awayTeamGoals: [String],
    homeTeamYellowCards: [String],
    awayTeamYellowCards: [String],
    homeTeamRedCards: [String],
    awayTeamRedCards: [String],
    substitutions: [String],
});

module.exports = mongoose.model('Match', matchSchema);