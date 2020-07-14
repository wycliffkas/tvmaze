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
`);
