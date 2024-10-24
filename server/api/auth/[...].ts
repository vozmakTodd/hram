import { NuxtAuthHandler } from '#auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,

  pages: {
    signIn: '/login'
  },

  providers: [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    CredentialsProvider.default({
      name: 'credentials',
      credentials: {},
      async authorize(credentials: { username: string; password: string }) {
        const config = useRuntimeConfig()

        if (
          credentials?.username === config.rootLogin &&
          credentials?.password === config.rootPass
        ) {
          return {
            id: '1',
            name: credentials!.username
          }
        }

        return null
      }
    })
  ],

  session: {
    strategy: 'jwt',
    maxAge: 86400,
    updateAge: 86400 / 4
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = {
          ...token,
          ...user
        }
      }

      return token
    },

    async session({ session, token }) {
      session.user = {
        ...token,
        ...session.user
      }

      return session
    }
  }
})
