const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
} = require('graphql');

const PlanetType = require('./PlanetType');

// Person Type Def
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

module.exports = PersonType;