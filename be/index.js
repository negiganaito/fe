/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const http = require("http");
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql");
const { createHandler } = require("graphql-http/lib/use/http");

const hostname = "127.0.0.1";
const port = 5000;

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "GreetingsQuery",
    fields: {
      greetings: {
        type: GraphQLString,
        resolve: () => "Hello World!",
      },
    },
  }),
});

const handler = createHandler({ schema });

const server = http.createServer((req, res) => {
  if (req.url.startsWith("/graphql")) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Request-Method", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
    res.setHeader("Access-Control-Allow-Headers", "*");
    if (req.method === "OPTIONS") {
      res.writeHead(200);
      res.end();
      return;
    }

    handler(req, res);
  } else {
    res.writeHead(200).end("Please, use /graphql suffix.");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = {
  schema,
};
