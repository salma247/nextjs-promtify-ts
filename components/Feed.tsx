"use client";

import { useState, useEffect } from "react";
import PromptCardList from "./PromptCardList";
import { Post } from "@/types/global";

export default function Feed() {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleTagClick = (tag: string) => {
    setSearchText(tag);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      if (searchText) {
        const res = await fetch(`/api/search/${searchText}`);
        const data = await res.json();
        setPosts(data);
        console.log(data);
        
      } else {
        const res = await fetch(`/api/prompt`);
        const data = await res.json();
        setPosts(data);
      }
    };

    fetchPosts();
  }, [searchText]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center" onSubmit={(e) => e.preventDefault()}>
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
