
import { withFilter } from 'graphql-subscriptions';

import ISchema from './ISchema';
import pubSub from '../pub-sub';
import postCore from '../../core/post-core';
import authorCore from '../../core/author-core';


class PostSchema implements ISchema {

  type = `
    # Description for Post type
    type Post {
      id: Int!
      
      # Title of the post
      title: String
      
      # Author of the post
      author: AuthorBase
      
      # Amount of votes for the specific post
      votes: Int
    }
  `;

  query = `
    # Get all posts
    posts(size: Int): [Post]
  `;

  mutation = `
    # Up votes a post
    upvotePost (postId: Int!): Post
  `;

  subscription = `
    # Subscribe to an up vote event
    postUpVoted(postId: Int!): Post
  `;

  resolver = {
    Query: {
      posts: async (root, { size }) => {
        const posts = await postCore.getPosts();
        return posts.slice(0, size || Number.MAX_SAFE_INTEGER);
      }
    },
    Mutation: {
      upvotePost: async (root, { postId }) => {
        // up vote the post
        const post = await postCore.upvotePost(postId);
        // notify all subscribers
        pubSub.publish('postUpVoted', { postUpVoted: post });
        // return the post
        return post;
      }
    },
    Post: {
      author: (post) => authorCore.getAuthor(post.authorId),
    },
    Subscription: {
      postUpVoted: {
        subscribe: withFilter(
          () => pubSub.asyncIterator('postUpVoted'),
          (payload, variables) => {
            return parseInt(payload.postUpVoted.id) === variables.postId;
          })
      }
    }
  };
}

export default PostSchema;
