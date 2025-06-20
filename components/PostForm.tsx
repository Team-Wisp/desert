import React, { useState, useEffect } from 'react';
import { topics, getSubtopics } from '@/lib/utils/topics';
import Button from './Button';

interface PostFormProps {
  onSubmit: (data: { postTitle: string; postContent: string; topic: string; subtopic: string }) => void;
  onCancel: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit, onCancel }) => {
  const [topic, setTopic] = useState('');
  const [subtopic, setSubtopic] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [touched, setTouched] = useState(false);
  const [subtopics, setSubtopics] = useState<string[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (topic) {
      setSubtopics(getSubtopics(topic));
      setSubtopic('');
    } else {
      setSubtopics([]);
      setSubtopic('');
    }
  }, [topic]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!topic || !subtopic || !postTitle.trim() || !postContent.trim()) {
      setError('All fields are required.');
      return;
    }
    setError('');
    onSubmit({ postTitle, postContent, topic, subtopic });
  }

  function handleCancel() {
    onCancel();
  }

  function handleTouch() {
    if (!touched) setTouched(true);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-sm">Topic</label>
        <select
          className="rounded-full border border-[#E5E5E5] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black bg-[#fafafa]"
          value={topic}
          onChange={e => { setTopic(e.target.value); handleTouch(); }}
          required
        >
          <option value="" disabled>Select a topic</option>
          {topics.map(t => (
            <option key={t.name} value={t.name}>{t.name}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-sm">Subtopic</label>
        <select
          className="rounded-full border border-[#E5E5E5] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black bg-[#fafafa]"
          value={subtopic}
          onChange={e => { setSubtopic(e.target.value); handleTouch(); }}
          required
          disabled={!topic}
        >
          <option value="" disabled>{topic ? 'Select a subtopic' : 'Select topic first'}</option>
          {subtopics.map(st => (
            <option key={st} value={st}>{st}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-sm">Title</label>
        <input
          className="rounded-full border border-[#E5E5E5] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black bg-[#fafafa]"
          value={postTitle}
          onChange={e => { setPostTitle(e.target.value); handleTouch(); }}
          placeholder="Post title"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-sm">Content</label>
        <textarea
          className="rounded-2xl border border-[#E5E5E5] px-4 py-2 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-black bg-[#fafafa] resize-none"
          value={postContent}
          onChange={e => { setPostContent(e.target.value); handleTouch(); }}
          placeholder="Write your post..."
          required
        />
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <div className="flex gap-4 justify-end">
        <Button type="button" variant="secondary" onClick={handleCancel} size="medium">Cancel</Button>
        <Button type="submit" variant="primary" size="medium">Post</Button>
      </div>
    </form>
  );
};

export default PostForm; 