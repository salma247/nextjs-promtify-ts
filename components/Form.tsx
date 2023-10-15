import React from "react";
import Link from "next/link";
import { Post } from "@/types/global";

type Props = {
  type: string;
  post: Post;
  setPost: React.Dispatch<
    React.SetStateAction<{
      prompt: string;
      tag: string[];
    }>
  >;
  submitting: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function Form({
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
}: Props) {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="text-left head_text">
        <span className="blue_gradient capitalize">{type} Prompt</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share your prompt with the world and let your imagination run
        wild with any AI-powered platform.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="text-base text-gray-700 font-satoshi font-semibold">
            Yor AI Prompt
          </span>

          <textarea
            value={post.prompt}
            required
            placeholder="Write your prompt here..."
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            className="form_textarea"
            rows={5}
          />
        </label>

        <label>
          <span className="text-base text-gray-700 font-satoshi font-semibold">
            Tag {`  `}
            <span className="font-normal ">
              (#product #webdevolopment #ai #gpt3 #idea)
            </span>
          </span>

          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: [...post.tag, e.target.value] })}
            type="text"
            className="form_input"
            placeholder="#tag"
            required
          />
        </label>

        <div
          className="flex-end mx-3 mb-5 gap-4"
        >
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

            <button
                type="submit"
                className="px-5 py-1.5 text-sm rounded-full bg-primary-orange text-white"
                disabled={submitting}
            >
                {submitting ? `${type}...` : type}
        </button>
        </div>
      </form>
    </section>
  );
}
