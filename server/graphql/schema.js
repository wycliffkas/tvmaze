const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Images {
        medium: String,
        original: String
    }

    type Show {
        id: Int,
        name: String,
        image: Images,
        summary: String, 
    }

    type personDetails {
        name: String
    }

    type Crew {
        person: personDetails
    }

    input userInputData {
        movie_id: Int
    }

    type Season {
        number: Int
    }

    type RootQuery {
        getShows: [Show!]
        getCrew(userInput: userInputData): [Crew]
        getSeasons(userInput: userInputData): [Season]
    }

    schema {
        query: RootQuery
    }
`)