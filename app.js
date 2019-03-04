const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const graphQlShema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");
const mongoose = require("mongoose");
const isAuth = require("./middleware/isAuth");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if(req.method == 'OPTIONS') {
    res.sendStatus(200);
  }
  next();
});

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
    app.listen(8000);
  })
  .catch(err => {
    console.log(err);
  });
