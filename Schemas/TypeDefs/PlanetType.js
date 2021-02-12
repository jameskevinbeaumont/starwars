const {
    GraphQLObjectType,
    GraphQLString,
} = require('graphql');

// Planet - 'origin'
const PlanetType = new GraphQLObjectType({
    name: 'Planet',
    fields: () => ({
        name: { type: GraphQLString }
    })
});

module.exports = PlanetType;