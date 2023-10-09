import NextAuth from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            email: string,
            id: string
        } & DefaultSession["user"]
    }
    
    interface Profile {
        email: string,
        name: string,
        picture: string
    }
}