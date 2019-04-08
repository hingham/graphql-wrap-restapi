# graphql-wrap-restapi
Example of using graphql to wrap a rest API 


### Queries:
All Parks: 
query{
  parks{
    name
    id
  }
}


Park by ParkCode
query{
  park(parkCode: "ebla"){
    name
    id
  }
}#

### Starting the App
`npm i`
visit: http://localhost:4000

#### Resources:
[primsma tutorial](https://www.prisma.io/blog/how-to-wrap-a-rest-api-with-graphql-8bf3fb17547d)

### GraphQL insights
`parent` gives you access to the information retrieved right before the nested query, which is useful if you need to use that data in the next query, such as using the lat long of a park to find the weather. 