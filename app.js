const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// allow cross-origin requests
app.use(cors());

const MONGO_CONFIG = {
  URI: 'mongodb+srv://christianrosado:Naruto900*@lpr-vgnlk.mongodb.net/Prototype?retryWrites=true&w=majority'
}

// connect to mlab database
mongoose.connect(MONGO_CONFIG.URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', () => {
  console.log('connected to database');
});

app.use('/api',graphqlHTTP({
  schema,
  graphiql: true
}));


app.listen(4000, () => {
  console.log('now listening for requests on port: 4000');
})