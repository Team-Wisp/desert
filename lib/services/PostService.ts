import Post from '@/lib/models/Post';

export class PostService {
  static async createPost(data: any) {
    return await Post.create(data);
  }
  // Add more methods as needed (fetch, update, etc.)
} 