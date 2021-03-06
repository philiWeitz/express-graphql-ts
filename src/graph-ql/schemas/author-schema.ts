
import ISchema from './ISchema';
import postCore from '../../core/post-core';
import authorCore from '../../core/author-core';


class AuthorSchema implements ISchema {

  type = `
    # Description for Author type (this one has no posts).
    # It's different from Author to avoid cyclic dependencies.
    # Alternative would be to use @excludeId directive.
    type AuthorBase {
      id: Int!
  
      # Description for first name attribute
      firstName: String
  
      # Description for last name attribute
      lastName: String
      @includeByRole(roles: ["admin"])
    }
  
    # Description for Author type
    type Author {
      id: Int!
  
      # Description for first name attribute
      firstName: String
  
      # Description for last name attribute
      lastName: String
  
      # Contains all the authors posts
      posts: [Post]
    }
  `;

  query = `
    # Get the author by id
    author(id: Int!): Author
  
    # This should be deprecated
    oldAuthorEndpoint(id: Int!): Author
    @deprecated
  `;

  mutation = `
    # Deletes an author by ID (admin)
    deleteAuthor (authorId: Int!): Author
    @authenticated(roles: ["admin"])
  `;

  resolver = {
    Query: {
      author: (root, {id}) => authorCore.getAuthor(id),
      oldAuthorEndpoint: (root, {id}) => authorCore.getAuthor(id),
    },
    Mutation: {
      deleteAuthor: (root, {authorId}) => authorCore.deleteAuthor(authorId),
    },
    Author: {
      posts: (author) => postCore.getPostsByAuthor(author.id),
    },
  };
}


export default AuthorSchema;
