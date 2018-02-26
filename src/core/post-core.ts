
import postDbService from '../db-service/post-db-service';

class PostCore {

  getPosts() {
    return postDbService.getAll();
  }

  getPostsByAuthor(authorId : number) {
    return postDbService.getByAuthorId(authorId);
  }

  async upvotePost(postId : number) {
    const post = await postDbService.getById(postId);
    if (post) {
      return postDbService.patchAndFetchById(postId, { votes: (post.votes + 1) });
    }
    return null;
  }

}

export default new PostCore();
