import fetchJson from "@/lib/api";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOption = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const { userId, password } = credentials;
        const user = await fetchJson(
          "https://all-well-backend.onrender.com/auth/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, password }),
          }
        );
        if (user) {
          return user;
        } else {
          throw new Error("Invalid credentials");
        }
      },
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOption);
