
import ISchema from './ISchema';
import AuthSchema from './authSchema';
import PostSchema from './postSchema';
import AuthorSchema from './authorSchema';

const schemas : ISchema[] = [
  new AuthSchema(),
  new PostSchema(),
  new AuthorSchema(),
];

export default schemas;
