interface Post {
    prompt: string,
    tag: string[],
}

interface User {
    _id: string,
    username: string,
    email: string,
    posts: Post[],
    image: string,
}

interface PostWithUser extends Post {
    creator: User,
    _id: string,
}

export type {
    Post,
    User,
    PostWithUser,
}