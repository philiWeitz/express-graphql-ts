
import * as jwt from 'jsonwebtoken';

import config from '../config';
import UserRole from '../enums/user-role';
import authorDbService from '../db-service/author-db-service';

class AuthCore {

  async authUser(lastName : string) {
    const author = await authorDbService.getByLastName(lastName);

    if (author) {
      // create the JWT and return it
      const token = jwt.sign({
        firstName: author.firstName,
        lastName: author.lastName,
        role: UserRole.ADMIN,
      }, config.JWT_SECRET, {
        // valid for one hour
        expiresIn: 60 * 60
      });

      return { token };
    }
    return null;
  }

}

export default new AuthCore();
