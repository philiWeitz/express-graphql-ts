
import { Model, RelationMappings } from 'objection';
import BaseModel from './base-model';


export default class AuthorModel extends BaseModel {
  firstName: string;
  lastName: string;

  constructor(firstName?, lastName?) {
    super();

    this.firstName = firstName || '';
    this.lastName = lastName || '';
  }

  static tableName = 'author';

  static jsonSchema = {
    type: 'object',
    required: ['firstName', 'lastName'],
    properties: {
      id: { type: 'integer' },
      firstName: { type: 'string' },
      lastName: { type: 'string' },
      createdAt: { type: 'date-time' },
      updatedAt: { type: 'date-time' },
    },
  };

  static relationMappings: RelationMappings = {
    posts: {
      relation: Model.HasManyRelation,
      modelClass: 'post-model',
      join: {
        from: 'author.id',
        to: 'post.authorId'
      }
    },
  };
}
