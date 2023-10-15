"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@/components/Form";

export default function UpdatePrompt() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const propmtId = searchParams.get("id");

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: [""],
  });

  useEffect(() => {
    const getPrompt = async () => {
      const res = await fetch(`/api/prompt/${propmtId}`);
      const prompt = await res.json();
      setPost({
        prompt: prompt.prompt,
        tag: prompt.tag,
      });
    };

    if (propmtId) {
      getPrompt();
    }
  }, [propmtId]);

  const updatePrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    if (!propmtId) return alert("Prompt not found");

    try {
      const response = await fetch(`/api/prompt/${propmtId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="update"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
}
