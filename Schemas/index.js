const axios = require('axios');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList
} = require('graphql');

// Person Type Def
const PersonType = require('./TypeDefs/PersonType');

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

module.exports = new GraphQLSchema({ query: RootQuery });