import NextAuth from "next-auth";
import GitHubProvider from 'next-auth/providers/github';
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/query";
import { writeClient } from "./sanity/lib/write-client";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (profile?.id) {
         
          const existingUser = await client
            .withConfig({ useCdn: false })
            .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: profile.id });

          // If no existing user, create a new one
          if (!existingUser) {
            await writeClient.create({
              _type: 'author',
              id: profile.id,
              name: user?.name,
              username: profile?.login,
              email: user?.email,
              image: user?.image,
              bio: profile?.bio || "",
            });
          }
        }
        return true;
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false;  // Return false if there's an error during sign-in
      }
    },

    async jwt({ token, account, profile }) {
      try {
        if (account && profile?.id) {
          const user = await client
            .withConfig({ useCdn: false })
            .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: profile.id });

          if (user?._id) {
            token.id = user?._id;  
          }
        }
        return token;
      } catch (error) {
        console.error("Error during JWT callback:", error);
        return token;  
      }
    },

    async session({ session, token }) {
      // Add user ID from the token to the session
      if (token?.id) {
        // session.userId = token.id;  // Assign the user ID to the session
        Object.assign(session,{id:token.id})
      }
      return session;
    },
  },
});
