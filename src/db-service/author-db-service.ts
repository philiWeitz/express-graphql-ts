
import BaseDbService from './base-db-service';
import AuthorModel from '../model/author-model';


class AuthorDbService extends BaseDbService<AuthorModel> {

  constructor() {
    super(AuthorModel);
  }

  getByLastName(lastName) : Promise<AuthorModel|null> {
    return this.model.query().where({ lastName }).first();
  }
}

export default new AuthorDbService();
