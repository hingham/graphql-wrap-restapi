const gql = String.raw;


typeDefs = gql`
type Query{
    parks: [Park!]!
    park(parkCode: String): Park!
    stateParks(stateCode: String!): [Park!]
    weather: Weather!
}

type Park {
   id: ID!
   parkCode: String!
   states: String!
   latLong: String!
   description: String!
   name: String!
   weather: Weather!
}

type Weather {
    summary: String!
    data: [Daily!]
}

type Daily {
    summary: String!
    sunriseTime: Int!
    sunsetTime: Int!
    moonPhase: Int!
    precipIntensity: Int!
    temperatureHigh: Int!
    temperatureLow: Int!
    cloudCover: Int!
}

`;

module.exports = typeDefs;

