import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import Admin from "@/models/Admin";
import { connectDB } from "@/lib/db";
import bcrypt from "bcryptjs";

export const authOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        await connectDB();

        const { email, password, admin } = credentials;

        // ADMIN LOGIN
        if (admin === "true") {
          const adminUser = await Admin.findOne({ username: email });

          if (!adminUser) return null;
          const passMatch = await bcrypt.compare(password, adminUser.password);
          if (!passMatch) return null;

          return {
            id: adminUser._id,
            email: adminUser.username,
            role: "admin",
          };
        }

        // USER LOGIN
        const user = await User.findOne({ email });

        if (!user) return null;
        const passMatch = await bcrypt.compare(password, user.password);
        if (!passMatch) return null;

        return {
          id: user._id,
          role: "user",
          name: user.name,
          email: user.email,
        };
      }
    })
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;

      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.sub;   //token.sub is the mongodb id of the user
      session.user.role = token.role;
      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
