import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Post from '@/lib/models/Post';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { postTitle, postContent, topic, subtopic } = await req.json();
    const userName = req.headers.get('x-username') || 'john';
    const org = req.headers.get('x-org');
    const orgType = req.headers.get('x-org-type');
    const emailHash = req.headers.get('x-user-id');

    console.log('POST /api/posts');
    console.log('Headers:', {
      userName,
      org,
      orgType,
      emailHash,
    });
    console.log('Body:', { postTitle, postContent, topic, subtopic });

    if (!postTitle || !postContent || !topic || !subtopic || !org || !orgType || !emailHash) {
      console.log('Missing fields:', {
        postTitle,
        postContent,
        topic,
        subtopic,
        org,
        orgType,
        emailHash,
      });
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const post = await Post.create({
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
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (err) {
    console.error('Error creating post:', err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
} 