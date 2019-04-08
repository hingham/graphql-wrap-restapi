const gql = String.raw;


typeDefs = gql`
type Query{
    parks: [Park!]!
    park(parkCode: String!): [ParkDetail!]
    stateParks(stateCode: String!): [Park!]
}

type Park {
    name: String!
    latLong: String!
    parkCode: String!
}


type ParkDetail {
   id: ID!
   parkCode: String!
   states: String!
   latLong: String!
   description: String!
   name: String!
   weather(first: Int!): Weather!
}

type Weather {
    summary: String!
    data(first: Int): [Daily!]
}

type Daily {
    time: String!
    summary: String!
    sunsetTime: Int!
    temperatureHigh: Float!
    temperatureLow: Float!
    windSpeed: Float!
}

`;

module.exports = typeDefs;

