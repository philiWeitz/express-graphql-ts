
import * as _ from 'lodash';
import { addDirectiveResolveFunctionsToSchema } from 'graphql-directive';


const customDirectivesSchema = `
  directive @authenticated(roles: [String]) on QUERY | FIELD_DEFINITION
  directive @excludeId on FIELD_DEFINITION
`;


const attachDirectives = (schema) => {
  addDirectiveResolveFunctionsToSchema(schema, {
    authenticated(resolve, source, args, { req }) {
      console.log('required roles:', args.roles);
      return resolve();
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
