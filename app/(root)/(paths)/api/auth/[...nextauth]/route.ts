// main tools
import dbConnect from '@/_lib/database/db-connect'
import NextAuth from 'next-auth'

// providers
import CustomProvider from 'next-auth/providers/credentials'

// services
import { LoginService } from '@/_lib/database/services/auth'

// types
import type { UserDataType } from '@/_types/models/user'
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
        await dbConnect()

        const user = await LoginService(credentials?.username)

        if (!user) throw new Error('username:Usuario no encontrado')
        if (user.password !== credentials?.password)
          throw new Error('password:Contraseña incorrecta')

        return { ...user }
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) token.user = user as UserDataType
      return token
    },

    session: async ({ session, token }) => {
      session.user = token.user

      return Promise.resolve(session)
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
