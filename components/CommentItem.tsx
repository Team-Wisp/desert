import React from 'react';

interface CommentItemProps {
  comment: {
    org: string;
    orgType: string;
    userName: string;
    content: string;
    createdAt: string;
    orgLogoUrl?: string;
  };
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-[#F0F0F0]">
      <img
        src={comment.orgLogoUrl || '/wisp-circle.png'}
        alt="Org Logo"
        className="w-8 h-8 rounded-full object-cover border border-[#eee] mt-1"
      />
      <div className="flex-1">
        <div className="flex items-center gap-2 text-xs text-[#888] mb-1">
          <span className="font-semibold">{comment.org}</span>
          <span className="mx-1">·</span>
          <span>@{comment.userName}</span>
          <span className="mx-1">·</span>
          <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="text-sm text-[#222] whitespace-pre-line">{comment.content}</div>
      </div>
    </div>
  );
};

export default CommentItem; 