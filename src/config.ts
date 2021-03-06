
import * as _ from 'lodash';

abstract class Config {

  static readonly NODE_ENV: string = process.env.NODE_ENV || 'development';

  // Server configuration
  static readonly HOST: string = process.env.HOST || 'http://0.0.0.0';
  static readonly PORT: number = _.parseInt(process.env.PORT) || 8080;

  // GraphQL configuration
  static readonly GRAPH_QL_MAX_DEPTH: number = _.parseInt(process.env.GRAPH_QL_MAX_DEPTH) || 10;

  // PubSub URL
  static readonly PUB_SUB_URL: string = process.env.PUB_SUB_URL || '0.0.0.0:8080/subscriptions';

  // Redis config
  static readonly REDIS_HOST: string = process.env.REDIS_HOST || 'redis';
  static readonly REDIS_PORT: number = _.parseInt(process.env.REDIS_PORT) || 6379;
  static readonly REDIS_PASSWORD : string = process.env.REDIS_PASSWORD || 'password';
  // default redis cache time in seconds
  static readonly REDIS_DEFAULT_EXPIRE : number = _.parseInt(process.env.REDIS_DEFAULT_EXPIRE) || 20;
  static readonly REDIS_URL: string|undefined = process.env.REDIS_URL;

  // JWT
  static readonly JWT_SECRET: string = process.env.REDIS_HOST || 'very_secret';
}

export default Config;
