

import * as _ from 'lodash';
import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';

import ISchema from './schemas/ISchema';
import directives from './directives';
import allSchemas from './schemas';


const combine = (schemas, property) => {
  return schemas.map(schema => {
    return schema[property] ? schema[property] : '';
  }).reduce((res, value) => {
    return `${res}${value}`;
  }, '');
};

const combineType = (schemas : ISchema[]) => combine(schemas, 'type');
const combineQuery = (schemas : ISchema[]) => combine(schemas, 'query');
const combineMutation = (schemas : ISchema[]) => combine(schemas, 'mutation');
const combineSubscriptions = (schemas : ISchema[]) => combine(schemas, 'subscription');


const typeDefs : string = `
  ${directives.schema}
  ${combineType(allSchemas)}
  
  # the schema allows the following query:
  type Query {
    ${combineQuery(allSchemas)}
  }
  
  # this schema allows the following mutation:
  type Mutation {
    ${combineMutation(allSchemas)}
  }
  
  # this schema allows the following subscriptions:
  type Subscription {
    ${combineSubscriptions(allSchemas)}
  }
`;

const resolvers = _.merge({}, ...allSchemas.map(schema => schema.resolver));

const schema : GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});


const schemaWithCustomDirectives : GraphQLSchema = directives.attachDirectives(schema);


export default schemaWithCustomDirectives;
