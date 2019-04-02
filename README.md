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