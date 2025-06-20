import React from 'react';
import { MoreHorizontal, Heart, MessageCircle, Eye } from 'lucide-react';

interface PostCardProps {
  post: {
    postTitle: string;
    postContent: string;
    userName: string;
    org: string;
    orgType: string;
    likes: number;
    views: number;
    comments: any[];
    topic: string;
    subtopic: string;
    createdAt: string;
    orgLogoUrl?: string;
  };
  onMenuClick?: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onMenuClick }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-6 mb-6 w-full max-w-2xl mx-auto flex flex-col gap-4">
      {/* Top Row: Logo, Topic, Subtopic, Menu */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={post.orgLogoUrl || '/wisp-circle.png'}
            alt="Org Logo"
            className="w-10 h-10 rounded-full object-cover border border-[#eee]"
          />
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[#888]">{post.topic}</span>
            <span className="inline-block bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full mt-1">
              {post.subtopic}
            </span>
          </div>
        </div>
        <button onClick={onMenuClick} className="p-2 rounded-full hover:bg-[#f3f3f3] transition-colors duration-200">
          <MoreHorizontal size={20} />
        </button>
      </div>
      {/* Company name, username, date */}
      <div className="flex items-center gap-2 text-sm text-[#666]">
        <span className="font-semibold">{post.org}</span>
        <span className="mx-1">·</span>
        <span>@{post.userName}</span>
        <span className="mx-1">·</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
      {/* Title */}
      <h2 className="text-xl font-bold text-[#191919] leading-tight">{post.postTitle}</h2>
      {/* Content */}
      <div className="text-base text-[#222] whitespace-pre-line">{post.postContent}</div>
      {/* Bottom Row: Likes, Comments, Views */}
      <div className="flex items-center gap-6 mt-2 text-[#888]">
        <div className="flex items-center gap-1 cursor-pointer">
          <Heart size={20} className="hover:text-red-500 transition-colors" />
          <span>{post.likes}</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer">
          <MessageCircle size={20} />
          <span>{post.comments.length}</span>
        </div>
        <div className="flex items-center gap-1">
          <Eye size={20} />
          <span>{post.views}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard; 