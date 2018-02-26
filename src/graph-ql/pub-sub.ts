
import { RedisPubSub } from 'graphql-redis-subscriptions';
import config from '../config';


const options = {
  connection: {
    host: config.REDIS_HOST,
    port: config.REDIS_PORT,
    retryStrategy: (options) => {
      // retry after 10 seconds
      return 10 * 1000;
    }
  }
};

export default new RedisPubSub(options);
