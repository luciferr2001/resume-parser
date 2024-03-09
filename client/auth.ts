import NextAuth, { type DefaultSession } from "next-auth"

import { PrismaAdapter } from "@auth/prisma-adapter"

import { getUserById } from "@/data/user"

import { db } from '@/lib/db'

import authConfig from "@/auth.config"
import { UserRole } from "@prisma/client"


export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error'
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true

      const exisitngUser = await getUserById(user.id)
      // Prevvent sign in without email verification
      if (!exisitngUser || !exisitngUser.emailVerified) return false;

      // TODO 2FA Check
      return true
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole
      }
      return session
    },
    async jwt({ token }) {
      if (token.sub) return token
      const exisitngUser = await getUserById(token.sub)
      if (!exisitngUser) return token;
      token.role = exisitngUser.role
      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig
})