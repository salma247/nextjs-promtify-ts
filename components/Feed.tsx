"use client";

import { useState, useEffect } from "react";
import PromptCardList from "./PromptCardList";
import { PostWithUser } from "@/types/global";

export default function Feed() {
  const [posts, setPosts] = useState<PostWithUser[]>([]);

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<PostWithUser[]>([]);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeout!);
    setSearchText(e.target.value);

    // Debounce search
    setSearchTimeout(
      setTimeout(() => {
        const filteredPosts = filterPrompts(e.target.value);
        setSearchResults(filteredPosts);
      }, 500)
    );
  };

  const handleTagClick = (tag: string) => {
    setSearchText(tag);

    const filteredPosts = filterPrompts(tag);
    setSearchResults(filteredPosts);
  };

  const filterPrompts = (searchText: string) => {
    const regex = new RegExp(searchText, "i");
    return posts.filter(
      (post) =>
        regex.test(post.prompt) ||
        regex.test(post.tag) ||
        regex.test(post.creator.username)
    );
  };

  const fetchPosts = async () => {
    if (searchText) {
      const filteredPosts = filterPrompts(searchText);
      setSearchResults(filteredPosts);
    } else {
      const res = await fetch(`/api/prompt`);
      const data = await res.json();
      setPosts(data);
    }
  };

  useEffect(() => {
    fetchPosts();
  });

  return (
    <section className="feed">
      <form
        className="relative w-full flex-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          value={searchText}
          required
          onChange={handleSearchChange}
          placeholder="Search for a tag or a username"
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={searchText ? searchResults : posts}
        handleTagClick={handleTagClick}
      />
    </section>
  );
}
