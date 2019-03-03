const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const graphQlShema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");
const mongoose = require("mongoose");
const isAuth = require('./middleware/isAuth');

const app = express();

app.use(bodyParser.json());

app.use(isAuth);

app.use(
  "/graphqlApi",
  graphqlHttp({
    schema: graphQlShema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@node-shop-api-cluster-wufh8.mongodb.net/${
      process.env.DB_NAME
    }?retryWrites=true`
  )
  .then(() => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
