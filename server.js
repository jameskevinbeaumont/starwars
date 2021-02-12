const express = require('express');
const axios = require('axios');
const { graphqlHTTP } = require('express-graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} = require('graphql');

const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

const app = express();

// Person
const PersonType = new GraphQLObjectType({
    name: 'Person',
    fields: () => ({
        name: { type: GraphQLString },
        origin: {
            type: PlanetType,
            resolve: person =>
                axios.get(person.homeworld).then(res => res.data)
        },
        height: { type: GraphQLString },
        mass: { type: GraphQLString },
        birthdate: {
            type: GraphQLString,
            resolve: person => person.birth_year
        }
    })
});

// Planet - 'origin'
const PlanetType = new GraphQLObjectType({
    name: 'Planet',
    fields: () => ({
        name: { type: GraphQLString }
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        people: {
            type: new GraphQLList(PersonType),
            resolve(parent, args) {
                return axios
                    .get('https://swapi.dev/api/people')
                    .then(res => res.data.results);
            }
        }
    }
});

const schema = new GraphQLSchema({ query: RootQuery });

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

const PORT = process.env.PORT || 8081

app.listen(
    PORT,
    console.log(`Server running in [${process.env.NODE_ENV}] mode on port ${PORT}`)
);