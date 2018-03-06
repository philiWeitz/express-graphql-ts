
import redis from 'redis';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PubSubRedisOptions } from 'graphql-redis-subscriptions/dist/redis-pubsub';

import config from '../config';

let connection = {};

// we need to parse the redis URL because pub sub doesn't accept url parameter
if (config.REDIS_URL) {
  const parseRedisUrl = require('parse-redis-url')(redis);
  connection = parseRedisUrl.parse(config.REDIS_URL);

} else {
  connection = {
    host: config.REDIS_HOST,
    port: config.REDIS_PORT,
    password: config.REDIS_PASSWORD,
  }
}


const options : PubSubRedisOptions = {
  connection: {
    ...connection,
    retryStrategy: (times : number) => {
      // retry after 10 seconds
      return 10 * 1000;
    }
  }
};

export default new RedisPubSub(options);
