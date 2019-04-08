const { GraphQLServer } = require("graphql-yoga");
const fetch = require("node-fetch");

const typeDefs = require("./schema.js");

let lat;
let long;


const baseURL = `https://developer.nps.gov/api/v1`;
const resolvers = {
  Query: {
    parks: () => {
      return fetch(
        `https://developer.nps.gov/api/v1/parks?&api_key=wHVUwIozPcAwXYFi5CRTDWDeVYHbTEdi0G5zGUVs`
      )
        .then(res => {
          return res.json();
        })
        .then(data => {
          // console.log(data);
          return data.data;
        });
    },
    park: (parent, args) => {
      console.log("hello", parent, args);
      const { parkCode} = args;
      console.log("park code", parkCode);
      let URL = "";
        URL = `https://developer.nps.gov/api/v1/parks?&parkCode=${parkCode}&api_key=${process.env.API_NP_KEY}`;
      return fetch(URL)
        .then(res => {
          return res.json();
        })
        .then(data => {
          return data.data[0];
        })
        .catch(e => {
          console.error("could not retrieve data");
        });
    },
    stateParks: (parent, args) => {
      console.log("hello", parent, args);
      const { stateCode } = args;
      let URL = "";
        URL = `https://developer.nps.gov/api/v1/parks?&stateCode=${stateCode}&api_key=wHVUwIozPcAwXYFi5CRTDWDeVYHbTEdi0G5zGUVs`;
      return fetch(URL)
        .then(res => {
          return res.json();
        })
        .then(data => {
          lat = data.data.latLong;
          long="stuff"
          console.log(lat, long)
          return data.data;
        })
        .catch(e => {
          console.error("could not retrieve data");
        });
    }
  },
  Park: {
    weather: () => {
      console.log();
      let URL = `https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/37.8267,-122.4233`;
      return fetch(URL)
        .then(res => {
          return res.json();
        })
        .then(data => {
          // console.log("data", data);
          return data.daily;
        })
        .catch(e => {
          console.error("could not retrieve data");
        });
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

console.log(typeDefs);

server.start(() => {
  console.log(`Server is running`);
});
