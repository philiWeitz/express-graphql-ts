
import BaseDbService from './base-db-service';
import PostModel from '../model/post-model';


class PostDbService extends BaseDbService<PostModel> {

  constructor() {
    super(PostModel);
  }

  getByAuthorId(authorId : number) : Promise<PostModel|undefined> {
    return PostModel.query().where('authorId', authorId).first();
  }
}

export default new PostDbService();
