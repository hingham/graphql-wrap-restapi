# graphql-wrap-restapi
Example of using graphql to wrap a rest API 

[![Build Status](https://www.travis-ci.com/hingham/graphql-wrap-restapi.svg?branch=master)](https://www.travis-ci.com/hingham/graphql-wrap-restapi)

#### [demo](https://graphql-wrap-rest.herokuapp.com/)


#### Query Examples:
All Parks: 
`query{
 parks{
	name
  latLong
  }
}`

Park Details
`query{
  park(parkCode:"fova"){
    name
    weather(first: 3){
      summary
      data{
        windSpeed
        time
        temperatureLow
        temperatureHigh
        windSpeed
      }
    }
  }
}`

State parks
`query{
  stateParks{
    name
    parkCode
    latLong
  }
}`


### Starting the App
clone the app
cd into `graphql-wrap-restapi`
`npm i`
explore: http://localhost:4000/graphql

#### Resources:
[primsma tutorial](https://www.prisma.io/blog/how-to-wrap-a-rest-api-with-graphql-8bf3fb17547d)


[testing](https://maxrohde.com/2018/12/29/testing-apollo-client-server-applications/
)

* References for writing additional tests
[graphql-query-test-mock](https://github.com/zth/graphql-query-test-mock)
[Apollo GraphQL Server Mocks](https://blog.apollographql.com/mocking-your-server-with-just-one-line-of-code-692feda6e9cd)

### GraphQL insights
`parent` in the resolver functions gives you access to the information retrieved right before the nested query, which is useful if you need to use that data in the next query, such as using the lat long of a park to find the weather. 

`args` in the resolver functions are the arguments you provide the query and can be used to filter information from the database, or hit to correct end point.

Each field in the `typeDefs` has to be resolved with a resolver function that returns an object. The object resolved must have all the fields as specified on the type object in the typeDefs.

On the client side, you must provide a root field, and then specify the fields you would like returned. 
