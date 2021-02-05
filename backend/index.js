const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const expressPlayground = require("graphql-playground-middleware-express")
  .default;
const schema = require("./schema/schema");

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/gql", expressPlayground({ endpoint: "/graphql" }));

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: false,
  })
);

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
