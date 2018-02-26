
import BaseDbService from './base-db-service';
import AuthorModel from '../model/author-model';


class AuthorDbService extends BaseDbService<AuthorModel> {

  constructor() {
    super(AuthorModel);
  }
}

export default new AuthorDbService();
