import React, { useState } from 'react';
import Button from './Button';

interface CommentFormProps {
  onSubmit: (content: string) => void;
  loading?: boolean;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit, loading }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) {
      setError('Comment cannot be empty.');
      return;
    }
    setError('');
    onSubmit(content);
    setContent('');
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
      <textarea
        className="rounded-2xl border border-[#E5E5E5] px-4 py-2 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-black bg-[#fafafa] resize-none"
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Add a comment..."
        required
        disabled={loading}
      />
      {error && <div className="text-red-500 text-xs">{error}</div>}
      <div className="flex justify-end">
        <Button type="submit" variant="primary" size="medium" disabled={loading}>
          {loading ? 'Posting...' : 'Post Comment'}
        </Button>
      </div>
    </form>
  );
};

export default CommentForm; 