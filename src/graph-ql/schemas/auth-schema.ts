
import ISchema from './ISchema';
import authCore from '../../core/auth-core';


class AuthSchema implements ISchema {
  type = `
    # Description for Auth login response type.
    type JWT {
      token: String!
    }
  `;

  query = '';

  mutation = `
    # Log into the system
    auth (authorLastName: String!): JWT
  `;

  resolver = {
    Mutation: {
      auth: (root, { authorLastName }) => authCore.authUser(authorLastName),
    },
  };
}

export default AuthSchema;
