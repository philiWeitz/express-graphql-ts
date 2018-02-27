
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PubSubRedisOptions } from 'graphql-redis-subscriptions/dist/redis-pubsub';

import config from '../config';


const options : PubSubRedisOptions = {
  connection: {
    host: config.REDIS_HOST,
    port: config.REDIS_PORT,
    password: config.REDIS_PASSWORD,
    retryStrategy: (times : number) => {
      // retry after 10 seconds
      return 10 * 1000;
    }
  }
};

export default new RedisPubSub(options);
