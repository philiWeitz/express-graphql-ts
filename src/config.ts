
import * as _ from 'lodash';

const config = {

  NODE_ENV: process.env.NODE_ENV || 'development',

  // Server configuration
  HOST: process.env.HOST || 'http://0.0.0.0',
  PORT: process.env.PORT || '8080',
  CORS_ENABLED: process.env.CORS_ENABLED || true,

  // GraphQL configuration
  GRAPH_QL_MAX_DEPTH: _.parseInt(process.env.GRAPH_QL_MAX_DEPTH) || 10,

  // PubSub URL
  PUB_SUB_URL: process.env.PUB_SUB_URL || '0.0.0.0:8080/subscriptions',

  // Redis config
  REDIS_HOST: process.env.REDIS_HOST || 'redis',
  REDIS_PORT: process.env.REDIS_PORT || '6379',

  // JWT
  JWT_SECRET: process.env.REDIS_HOST || 'very_secret',
};

export default config;
