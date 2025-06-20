import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { PostService } from '@/lib/services/PostService';

// POST /api/posts - Create a new post
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { postTitle, postContent, topic, subtopic } = await req.json();
    // Extract user/org info from headers (set by middleware)
    const emailHash = req.headers.get('x-user-id'); // sub is used as emailHash
    const org = req.headers.get('x-org');
    const orgType = req.headers.get('x-org-type');
    const userName = req.headers.get('x-username') || 'john';
    const userId = req.headers.get('x-user-id');

    // Validate required fields
    if (!postTitle || !postContent || !topic || !subtopic || !org || !orgType || !emailHash) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Create the post using the service, and update user's posts array
    const post = await PostService.createPost({
      postTitle,
      postContent,
      topic,
      subtopic,
      userName,
      org,
      orgType,
      emailHash,
      likes: 0,
      views: 0,
      comments: [],
    }, userId!);

    return NextResponse.json({ post }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
} 