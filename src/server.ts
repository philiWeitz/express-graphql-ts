
import * as cors from 'cors';
import * as express from 'express';
import * as jwt from 'express-jwt';
import * as bodyParser from 'body-parser';
import * as depthLimit from 'graphql-depth-limit';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';

import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import * as Knex from 'knex';
import { Model } from 'objection';

import config from './config';
import schema from './graph-ql/schema';


const knexConfig = require('../knexfile');
const knexSettings = knexConfig[config.NODE_ENV];
const knex = Knex(knexSettings);
Model.knex(knex);


const server = express();


server.use('*', cors({
  origin: '*'
}));


server.use('/graphql', bodyParser.json(), jwt({
  secret: config.JWT_SECRET,
  credentialsRequired: false,
}), graphqlExpress(req => ({
  schema,
  debug: false,
  tracing: false,
  context: { req },
  validationRules: [depthLimit(config.GRAPH_QL_MAX_DEPTH)],
})));


server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://${config.PUB_SUB_URL}`
}));


server.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(err.status).send({
    statusCode: err.status,
    error: err.name,
    message: err.message,
  });
});


// We wrap the express server so that we can attach the WebSocket for subscriptions
const ws = createServer(server);

ws.listen(config.PORT, () => {
  console.log(`GraphQL Server is now running on ${config.HOST}:${config.PORT}`);

  // Set up the WebSocket for handling GraphQL subscriptions
  new SubscriptionServer({
    execute,
    subscribe,
    schema
  }, {
    server: ws,
    path: '/subscriptions',
  });
});
