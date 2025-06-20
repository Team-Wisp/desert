"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PostForm from "@/components/PostForm";
import ConfirmModal from "@/components/ConfirmModal";
import Navbar from "@/components/Navbar";

const CreatePostPage = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [pending, setPending] = useState(false);
  const [touched, setTouched] = useState(false);
  const router = useRouter();

  async function handleSubmit(data: { postTitle: string; postContent: string; topic: string; subtopic: string }) {
    setPending(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        router.push("/");
      } else {
        alert("Failed to create post");
      }
    } finally {
      setPending(false);
    }
  }

  function handleCancel() {
    setShowConfirm(true);
  }

  function handleConfirmDiscard() {
    setShowConfirm(false);
    router.back();
  }

  function handleCancelModal() {
    setShowConfirm(false);
  }

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center px-2">
      <Navbar />
      <div className="w-full max-w-xl mt-8">
        <h2
          className="text-4xl font-bold mb-6 text-center tracking-tight"
          style={{ fontFamily: 'Merriweather, Georgia, serif' }}
        >
          Create a Post
        </h2>
        <PostForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
      <ConfirmModal
        open={showConfirm}
        message="Are you sure you want to discard your current post?"
        onConfirm={handleConfirmDiscard}
        onCancel={handleCancelModal}
      />
      {pending && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
          <div className="bg-white px-6 py-4 rounded-xl shadow text-lg">Posting...</div>
        </div>
      )}
    </div>
  );
};

export default CreatePostPage; 