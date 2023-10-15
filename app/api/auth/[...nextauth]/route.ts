import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials"

import User from '@/models/user';
import { connectToDB } from '@/utils/database';

const handler = NextAuth({
  providers: [
    process.env.VERCEL_ENV === "preview"
    ? CredentialsProvider({
        name: "Credentials",
        credentials: {
          username: {
            label: "Username",
            type: "text",
            placeholder: "jsmith",
          },
          password: { label: "Password", type: "password" },
        },
        async authorize() {
          return {
            id: 1,
            name: "J Smith",
            email: "jsmith@example.com",
            image: "https://i.pravatar.cc/150?u=jsmith@example.com",
          } as any;
        },
      })
    : GoogleProvider({
        clientId: process.env.GOOGLE_ID as string,
        clientSecret: process.env.GOOGLE_SECRET as string,
      }),
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();

        const userExists = await User.findOne({ email: profile?.email });

        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile?.name?.replace(" ", "").toLowerCase(),
            image: profile?.picture,
          });
        }

        return true
      } catch (error : any) {
        console.log("Error checking if user exists: ", error.message);
        return false
      }
    },
  }
})

export { handler as GET, handler as POST }
