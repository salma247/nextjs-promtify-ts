'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@/components/Profile';

export default function MyProfile() {
    const [posts, setPosts] = useState([]);
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(`/api/users/${session?.user.id}/posts`);
            const posts = await res.json();
            setPosts(posts);
        }
        if (session?.user.id) {
            fetchPosts();
        }
    }, []);

    const handleEdit = (post : any) => {
        router.push(`update-prompt?id=${post._id}`);
    }

    const handleDelete = (post: any) => {
        fetch(`/api/posts/${post._id}`, {
            method: 'DELETE'
        }).then(() => {
            // router.reload();
        })
    }
    return (
        <Profile
            name={session?.user?.name}
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquam nunc, eget lacinia nisl nisl nec nisl."
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />

    )
}
