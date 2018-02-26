
import authorDbService from '../db-service/author-db-service';

class AuthorCore {

  getAuthor(id : number) {
    return authorDbService.getById(id);
  }

  deleteAuthor(id : number) {
    return authorDbService.deleteById(id);
  }
}

export default new AuthorCore();
