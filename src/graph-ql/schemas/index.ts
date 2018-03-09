
import ISchema from './ISchema';
import AuthSchema from './auth-schema';
import PostSchema from './post-schema';
import AuthorSchema from './author-schema';

const schemas : ISchema[] = [
  new AuthSchema(),
  new PostSchema(),
  new AuthorSchema(),
];

export default schemas;
