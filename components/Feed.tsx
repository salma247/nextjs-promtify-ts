"use client";

import { useState, useEffect } from "react";
import PromptCardList from "./PromptCardList";

export default function Feed() {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleTagClick = (tag: string) => {
    setSearchText(tag);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/prompt`);
      const data = await res.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          value={searchText}
          required
          onChange={handleSearchChange}
          placeholder="Search for a tag or a username"
          className="search_input peer"
        />
      </form>

      <PromptCardList data={posts} handleTagClick={handleTagClick} />
    </section>
  );
}
