
import * as _ from 'lodash';
import { GraphQLSchema } from 'graphql';
import { addDirectiveResolveFunctionsToSchema } from 'graphql-directive';


// schema for all custom directives
const customDirectivesSchema : string = `
  directive @authenticated(roles: [String]) on QUERY | FIELD_DEFINITION
  directive @excludeId on FIELD_DEFINITION
`;


// attaches the custom directives resolvers to the schema
const attachDirectives = (schema : GraphQLSchema) : GraphQLSchema => {
  addDirectiveResolveFunctionsToSchema(schema, {

    authenticated(resolve, source, args, { req }) {
      console.debug('required route roles:', args.roles);
      if (_.get(args, 'roles', []).includes(_.get(req, 'user.role', null))) {
        return resolve();
      }
      console.error('Error: insufficient role');
      return null;
    },

    async excludeId(resolve) {
      const value = await resolve();
      return _.omit(value, ['id']);
    },

    deprecated(resolve) {
      return resolve();
    },
  });
  return schema;
};


export default {
  attachDirectives,
  schema: customDirectivesSchema,
};
