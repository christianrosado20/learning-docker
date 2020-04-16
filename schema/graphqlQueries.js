/*
*   Queries that are used frequently in the GraphQL portal
*   to access the portal use: localhost:4000/api
*/


// Mutations
// ----------------------------
// Adding Mutations
// -----------------------------
// Add Player
` mutation {
   addPlayer(name: "Morgan Maldonado", age: 25, goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchAppearances: 0, teamId: "5e72dc96c8e6aa595969a3ca") {
     name
     age
     goals
     assists
     yellowCards
     redCards
     matchAppearances
     team {
       name
     }
   }
 } `

// Add Team
` mutation {
   addTeam(name: "Ramey SC", badge: "RameySC.png" , matchesPlayed: 0, matchesWon: 0, matchesLost: 0, goalsScored: 0, goalsScoredAgainst: 0) {
     name
     badge
     matchesPlayed
     matchesWon
     matchesLost
     goalsScored
     goalsScoredAgainst
   } 
 } `

// Add Match
 `mutation {
   addMatch(matchWeek: 0, date:"Fake Date", homeTeam: "", awayTeam: "") {
     matchWeek
     date
     homeTeam {
       name
     }
     awayTeam {
       name
     }
   } 
 }`

 // Add User
 `mutation {
   addUser(name: "", username: "", email: "", password: "") {
     name
     username
     email
     password
   }
 }`

// ---------------------------
// Queries
// ---------------------------

 //  Query Players
 `{
   players {
     name
     team {
      name
     }
   }
 }`

// Query Specific Team
`{
  team(id: "5e72dc96c8e6aa595969a3ca") {
    name
    players {
      name
    }
  }
 }`

// Query Specific Match
` {
   match(id:"5e73c4c951b9f75d88381b92") {
     homeTeam {
       name
     }
     awayTeam {
       name
     }
     homeTeamScore 
     awayTeamScore
   }
 } `