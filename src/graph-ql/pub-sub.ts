
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PubSubRedisOptions } from 'graphql-redis-subscriptions/dist/redis-pubsub';

import RedisUtil from '../util/redis-util';


const options : PubSubRedisOptions = {
  connection: {
    ...RedisUtil.redisConnection,
    retryStrategy: (times : number) => {
      // retry after 10 seconds
      return 10 * 1000;
    }
  }
};

export default new RedisPubSub(options);
