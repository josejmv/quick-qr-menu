// main tools
import CustomProvider from 'next-auth/providers/credentials'
import NextAuth from 'next-auth'

const handler = NextAuth({
  providers: [
    CustomProvider({
      id: 'login',
      name: 'login',
      credentials: {
        username: { type: 'text' },
        password: { type: 'password' },
      },
      authorize: async (credentials) => {
        if (
          credentials?.username !== 'josejmvasquez' ||
          credentials?.password !== '123456'
        )
          throw new Error('Credenciales incorrectas')

        return { id: '1', email: credentials?.username, name: 'Jose Vasquez' }
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) token.id = user.id

      return Promise.resolve(token)
    },
    session: async ({ session, token }) => {
      session.user = { ...token }
      console.log('SESSION', session)

      return Promise.resolve(session)
    },
  },
})

export { handler as GET, handler as POST }
