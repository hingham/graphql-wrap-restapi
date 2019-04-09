const {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  mockServer
} = require("graphql-tools");

const { graphql } = require("graphql");

const schema = require("../src/schema.js");

const typeDefs = schema;
const mockSchema = makeExecutableSchema({ typeDefs });

const ParkCase = {
  query: `
    query { parks { name } } `,
  variables: {},
  context: {},
  expected: { data: { parks: [{ name: "Park" }, { name: "Park" }] } }
};

addMockFunctionsToSchema({
  schema: mockSchema,
  mocks: {
    Boolean: () => true,
    ID: () => "1",
    Int: () => 1,
    Float: () => 1.2,
    String: () => "Park"
  }
});

describe("Schema", () => {
  it("Has valid type definitions", async () => {
    expect(async () => {
      const MockServer = mockServer(typeDefs);
      await MockServer.query(`{ __schema { types { name } } }`);
    }).not.toThrow();
  });

  let { query, variables, context: ctx, expected } = ParkCase;

  it(`Testing Query: ParkCase`, async () => {
    return await expect(
      graphql(mockSchema, query, null, { ctx }, variables)
    ).resolves.toEqual(expected);
  });
});

const StateParkCase = {
  query: `
        query{
            stateParks(stateCode: "wa"){
            name
            }
        }`,
  variables: {},
  context: {},
  expected: { data: { stateParks: [{ name: "Park" }, { name: "Park" }] } }
};

describe("Queries", () => {
  const { query, variables, context: ctx, expected } = StateParkCase;

  console.log("expected", expected);
  it(`Testing Query: ParkCase`, async () => {
    return await expect(
      graphql(mockSchema, query, null, { ctx }, variables)
    ).resolves.toEqual(expected);
  });
});
