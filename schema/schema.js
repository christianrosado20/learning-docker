const graphql = require('graphql');
const Team = require('../models/team');
const Player = require('../models/player');
const Match = require('../models/matches');
const User = require('../models/user');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

// Team Type 
const TeamType = new GraphQLObjectType({
    name: 'Team',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        badge: { type: GraphQLString },
        matchesPlayed: { type: GraphQLInt },
        matchesWon: { type: GraphQLInt },
        matchesDraw: { type: GraphQLInt },
        matchesLost: { type: GraphQLInt },
        goalsScored: { type: GraphQLInt },
        goalsScoredAgainst: { type: GraphQLInt },
        players: {
            type: GraphQLList(PlayerType),
            resolve(parent, args) {
                return Player.find({ teamId: parent.id});
            }
        }
    })
});

// Player Type 
const PlayerType = new GraphQLObjectType({
    name: 'Player',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        goals: { type: GraphQLInt },
        assists: { type: GraphQLInt },
        yellowCards: { type: GraphQLInt },
        redCards: { type: GraphQLInt },
        matchAppearances: { type: GraphQLInt },
        team: {
            type: TeamType,
            resolve(parent, args) {
                return Team.findById(parent.teamId);
            }
        }
    })
});

// Match Type
const MatchType = new GraphQLObjectType({
    name: 'Match',
    fields: () => ({
        id: { type: GraphQLID },
        matchWeek: { type: GraphQLInt },
        date: { type: GraphQLString },
        location: { type: GraphQLString },
        homeTeam: {
            type: TeamType,
            resolve(parent, args) {
                return Team.findById(parent.homeTeam);
            }
        },
        awayTeam: {
            type: TeamType,
            resolve(parent, args) {
                return Team.findById(parent.awayTeam);
            }
        },
        homeTeamScore: { type: GraphQLInt },
        awayTeamScore: { type: GraphQLInt },
        homeTeamLineup: {
            type: GraphQLList(PlayerType),
            resolve(parent, args) {
                return Player.find({ teamId: parent.id});
            }
        },
        awayTeamLineup: {
            type: GraphQLList(PlayerType),
            resolve(parent, args) {
                return Player.find({ teamId: parent.id});
            }
        }
    })
});

// User Type
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString}
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // Query Specific Team
        team: {
            type: TeamType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args) {
                return Team.findById(args.id);
            }
        },
        // Query Specific Player
        player: {
            type: PlayerType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args) {
                return Player.findById(args.id);
            }
        },
        // Query Specific Match
        match: {
            type: MatchType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args) {
                return Match.findById(args.id);
            }
        },
        user: {
            type: UserType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args) {
                return User.findById(args.id);
            }
        },
        // Query All of the Teams
        teams: {
            type: GraphQLList(TeamType),
            resolve(parent, args) {
                return Team.find({});
            }
        },
        // Query All of the Players
        players: {
            type: GraphQLList(PlayerType),
            resolve(parent, args) {
                return Player.find({});
            }
        },
        matches: {
            type: GraphQLList(MatchType),
            resolve(parent, args) {
                return Match.find({});
            }
        },
        users: {
            type: GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({});
            }
        }
    }
});

// Mutations
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // Adding new Teams
        addTeam: {
            type: TeamType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                badge: { type: new GraphQLNonNull(GraphQLString) },
                matchesPlayed: { type: new GraphQLNonNull(GraphQLInt) },
                matchesWon: { type: new GraphQLNonNull(GraphQLInt) }, 
                matchesDraw: { type: new GraphQLNonNull(GraphQLInt) }, 
                matchesLost: { type: new GraphQLNonNull(GraphQLInt) },
                goalsScored: { type: new GraphQLNonNull(GraphQLInt) },
                goalsScoredAgainst: { type: new GraphQLNonNull(GraphQLInt) }
            }, 
            resolve(parent, args) {
                let team = new Team({
                   name: args.name,
                   badge: args.badge,
                   matchesPlayed: args.matchesPlayed,
                   matchesWon: args.matchesWon,
                   matchesDraw: args.matchesDraw,
                   matchesLost: args.matchesLost,
                   goalsScored: args.goalsScored,
                   goalsScoredAgainst: args.goalsScoredAgainst
                });
                return team.save();
            }
        },
        // Adding new Players
        addPlayer: {
            type: PlayerType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
                goals: { type: new GraphQLNonNull(GraphQLInt) },
                assists: { type: new GraphQLNonNull(GraphQLInt) },
                yellowCards: { type: new GraphQLNonNull(GraphQLInt) },
                redCards: { type: new GraphQLNonNull(GraphQLInt) },
                matchAppearances: { type: new GraphQLNonNull(GraphQLInt) },
                teamId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let player = new Player({
                    name: args.name,
                    age: args.age,
                    goals: args.goals,
                    assists: args.assists,
                    yellowCards: args.yellowCards,
                    redCards: args.redCards,
                    matchAppearances: args.matchAppearances,
                    teamId: args.teamId
                });
                return player.save();
            }
        },
        // Adding new Match
        addMatch: {
            type: MatchType,
            args: {
                matchWeek: { type: new GraphQLNonNull(GraphQLInt) },
                date: { type: new GraphQLNonNull(GraphQLString) },
                location: { type: new GraphQLNonNull(GraphQLString) },
                homeTeam: { type: new GraphQLNonNull(GraphQLID)},
                awayTeam: { type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
               let match = new Match({
                   matchWeek: args.matchWeek,
                   date: args.matchWeek,
                   location: args.location,
                   homeTeam: args.homeTeam,
                   awayTeam: args.awayTeam,
                   homeTeamScore: 0,
                   awayTeamScore: 0
               });
               return match.save(); 
            }
        },

        // Adding new Users
        addUser: {
            type: UserType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                username: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
                let user = new User({
                    name: args.name,
                    username: args.username,
                    email: args.email,
                    password: args.password
                });
                return user.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})