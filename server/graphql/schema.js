const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Images {
        medium: String,
        original: String
    }

    type Rate {
        average: Float
    }

    type Show {
        id: Int,
        name: String,
        image: Images,
        summary: String, 
        genres: [String],
        rating: Rate,
        premiered: String,
        status: String
    }

    type personDetails {
        name: String
    }

    type Crew {
        person: personDetails
    }

    input InputData {
        movie_id: Int
    }

    type Season {
        number: Int
    }

    type User {
        _id: ID!
        name: String!
        username: String!
        password: String
    }

    input UserInputData {
        username: String!
        name: String!
        password: String!
    }

    type AuthData {
        token: String!
        userId: String!
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
    }

    type RootQuery {
        getShows: [Show!]
        getCrew(userInput: InputData): [Crew]
        getSeasons(userInput: InputData): [Season]
        login(username: String!, password: String!): AuthData!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
