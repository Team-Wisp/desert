import React from 'react';
import CommentItem from './CommentItem';

interface CommentListProps {
  comments: Array<{
    org: string;
    orgType: string;
    userName: string;
    content: string;
    createdAt: string;
    orgLogoUrl?: string;
  }>;
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return <div className="text-sm text-[#888] py-4 text-center">No comments yet.</div>;
  }
  return (
    <div className="w-full">
      {comments.map((comment, idx) => (
        <CommentItem key={idx} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList; 