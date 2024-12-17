// main tools
import NextAuth from 'next-auth'

// providers
import CustomProvider from 'next-auth/providers/credentials'

// assets
import User from '~/public/data/user/owner.json'

// types
import type { AuthOptions } from 'next-auth'

export const authOptions: AuthOptions = {
  pages: { signIn: '/iniciar-sesion' },

  providers: [
    CustomProvider({
      id: 'login',
      name: 'login',
      credentials: {
        username: { type: 'text' },
        password: { type: 'password' },
      },
      authorize: async (credentials) => {
        if (credentials?.username !== 'josejmv')
          throw new Error('username:Usuario no encontrado')
        if (credentials?.password !== '1234')
          throw new Error('password:Contraseña incorrecta')

        // fetch user data
        return User
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) token.sub = user.id

      return Promise.resolve(token)
    },

    session: async ({ session, token }) => {
      session.user = { ...token }
      console.log('SESSION', session)

      return Promise.resolve(session)
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
