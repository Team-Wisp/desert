import Post from '@/lib/models/Post';
import User from '@/lib/models/User';

export class PostService {
  static async createPost(data: any, userId: string) {
    const post = await Post.create(data);
    // Add post to user's posts array using emailHash
    console.log('Adding post to user:', { userId, postId: post._id });
    const userUpdate = await User.findOneAndUpdate(
      { emailHash: userId },
      { $push: { posts: post._id } },
      { new: true }
    );
    if (!userUpdate) {
      console.error('Failed to update user with new post', { userId, postId: post._id });
    } else {
      console.log('User updated with new post:', userUpdate._id);
    }
    return post;
  }
  // Add more methods as needed (fetch, update, etc.)
} 