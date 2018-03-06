
import * as redis from "redis";
import { RedisClient, ClientOpts } from "redis";

import config from '../config';

const redisOptions: ClientOpts = {
  port: config.REDIS_PORT,
  host: config.REDIS_HOST,
  password: config.REDIS_PASSWORD,
};

class RedisUtil {

  // if redis url is specified use that one, otherwise separate definitions
  readonly client : RedisClient = config.REDIS_URL
    ? redis.createClient(config.REDIS_URL)
    : redis.createClient(redisOptions);


  // TODO: promisify client.get
  get<T>(key) : Promise<T> {
    return new Promise((resolve, reject) => {
      this.client.get(key, (error, reply) => {
        if (!error && reply) {
          try {
            const result = (JSON.parse(reply) as T);
            return resolve(result);
          } catch(e) {
            console.error('Error: unable to parse and cast redis result');
          }
        }
        reject();
      })
    });
  }

  set(key : string, value : any|null, duration : number = config.REDIS_DEFAULT_EXPIRE) : boolean {
    if (value && key) {
      return this.client.set(key, JSON.stringify(value),'EX', duration);
    }
    return false;
  }
}


export default new RedisUtil();
