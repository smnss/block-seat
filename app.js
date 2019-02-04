const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();

app.use(bodyParser.json());

app.use(
  "/graphqlApi",
  graphqlHttp({
    schema: buildSchema(`
    type RootQuery {
        events: [String!]!
    }
    type RootMutation {
        changeEvent( name: String): String
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
    `),
    rootValue: {
        events: () => {
            return ['value1', 'value2', 'value3'];
        },
        changeEvent(args) {
            const eventName = args.name;
            return eventName;
        }
    },
    graphiql: true
  })
);

app.listen(3000);
