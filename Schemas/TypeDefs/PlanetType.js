const {
    GraphQLObjectType,
    GraphQLString,
} = require('graphql');

// Planet Type Def ('origin')
const PlanetType = new GraphQLObjectType({
    name: 'Planet',
    fields: () => ({
        name: { type: GraphQLString }
    })
});

module.exports = PlanetType;