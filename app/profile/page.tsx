"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@/components/Profile";

export default function MyProfile() {
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const posts = await res.json();
      setPosts(posts);
    };
    if (session?.user.id) {
      fetchPosts();
    }
  }, [session?.user.id]);

  const handleEdit = (post: any) => {
    router.push(`update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post: any) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((p: any) => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (error) {
        console.error(error);
      }
    }
  };
  
  return (
    <Profile
      name={session?.user?.name}
      desc="See all your prompts here, edit or delete them as you wish."
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}
