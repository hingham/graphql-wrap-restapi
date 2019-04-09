require("dotenv").config();
const express = require('express');
app = express();

const { ApolloServer } = require("apollo-server-express");
const fetch = require("node-fetch");

const typeDefs = require("./src/schema.js");

async function feed(parent, args, context, info) {
  const where = args.filter ? {
    OR: [
      { description_contains: args.filter },
      { url_contains: args.filter },
    ],
  } : {}

  const links = await context.prisma.links({
    where
  })
  return links
}

const baseURL = `https://developer.nps.gov/api/v1`;

const resolvers = {
  Query: {
    parks: () => {
      return fetch(
        `${baseURL}/parks?&api_key=${
          process.env.API_NP_KEY
        }`
      )
        .then(res => {
          return res.json();
        })
        .then(data => {
          return data.data;
        });
    },
    park: (parent, args) => {
      console.log("hello", parent, args);
      const { parkCode } = args;
      console.log("park code", parkCode);

      let URL = `https://developer.nps.gov/api/v1/parks?&parkCode=${parkCode}&api_key=${
        process.env.API_NP_KEY
      }`;
      console.log("url", URL);
      return fetch(URL)
        .then(res => {
          return res.json();
        })
        .then(data => {
          return data.data;
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
          return data.data;
        })
        .catch(e => {
          console.error("could not retrieve data");
        });
    }
  },
  ParkDetail: {
    weather: (parent, args) => {
      console.log('args', parent, args)
      // let {first} = args;
      const first = args && args.first ? args.first : 10;
      if(parent.latLong){
        let lat = parent.latLong.split(',')[0].slice(4, 12);
        let long = parent.latLong.split(',')[1].slice(6, 13);
        console.log(lat, long)
        let URL = `https://api.darksky.net/forecast/${
          process.env.DARK_SKY_KEY
        }/${lat},${long}`;
        console.log(URL);
        return fetch(URL)
          .then(res => {
            return res.json();
          })
          .then(data => {
            data.daily.data = data.daily.data.slice(0, first);
            data.daily.data.forEach(time =>{
              let date = new Date(time.time * 1000)
              date = date.toDateString();
              time.time = date.slice(0, date.length - 5)
            })
            return data.daily;
          })
          .catch(e => {
            console.error("could not retrieve data");
          });
      }
      else{
        return "weather not found for that location"
      }
    }
  }
};

// const server = new GraphQLServer({
//   typeDefs,
//   resolvers
// });
// server.start(() => {
//   console.log(`Server is running`);
// });

const server = new ApolloServer({
  typeDefs,
  resolvers
});

app.listen(4000);

server.applyMiddleware({ app });


