const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./Schemas');

const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

const PORT = process.env.PORT || 8081

app.listen(
    PORT,
    console.log(`Server running in [${process.env.NODE_ENV}] mode on port ${PORT}`)
);