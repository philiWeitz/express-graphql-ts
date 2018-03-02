
import redisClient from '../util/redis-util';
import BaseDbService from './base-db-service';
import AuthorModel from '../model/author-model';


const getAuthorNameKey = (name : string) : string => `author/getByLastName/${name}`;


class AuthorDbService extends BaseDbService<AuthorModel> {

  constructor() {
    super(AuthorModel);
  }

  async getByLastName(lastName : string) : Promise<AuthorModel|null> {
    // an example on how redis could be used to cache expensive queries
    const author = await redisClient.get<AuthorModel>(getAuthorNameKey(lastName)).catch(async() => {
      // set the author, if not exist
      const author = await this.model.query().where({ lastName }).first();
      redisClient.set(getAuthorNameKey(lastName), author);
      return author;
    });

    return author;
  }
}

export default new AuthorDbService();
