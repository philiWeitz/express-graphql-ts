
import authCore from '../../core/auth-core';


const AuthType = `
  # Description for Auth login response type.
  type JWT {
    token: String!
  }
`;


const AuthMutation = `
  # Log into the system
  auth (authorLastName: String!): JWT
`;


const AuthResolver = {
  Mutation: {
    auth: (root, { authorLastName }) => authCore.authUser(authorLastName),
  },
};


export default {
  type: AuthType,
  mutation: AuthMutation,
  resolver: AuthResolver,
};
