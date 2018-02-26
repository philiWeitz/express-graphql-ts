
import BaseModel from './base-model';


export default class PostModel extends BaseModel {
  title: string;
  votes: number;
  authorId: number;

  static tableName = 'post';

  static jsonSchema = {
    type: 'object',
    required: ['title', 'votes'],
    properties: {
      id: { type: 'integer' },
      title: { type: 'string' },
      votes: { type: 'integer' },
      authorId: { type: 'integer' },
      createdAt: { type: 'date-time' },
      updatedAt: { type: 'date-time' },
    },
  };
}
