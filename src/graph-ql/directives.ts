
import * as _ from 'lodash';
import { addDirectiveResolveFunctionsToSchema } from 'graphql-directive';


const customDirectivesSchema = `
  directive @authenticated(roles: [String]) on QUERY | FIELD_DEFINITION
  directive @excludeId on FIELD_DEFINITION
`;


const attachDirectives = (schema) => {
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
