interface Post {
    _id: string,
    prompt: string,
    tag: string,
    creator: User,
}

interface User {
    _id: string,
    username: string,
    email: string,
    posts: Post[],
    image: string,
}

export type {
    Post,
    User,
}