// main tools
import dbConnect from '@/_lib/database/db-connect'
import NextAuth from 'next-auth'

// providers
import CustomProvider from 'next-auth/providers/credentials'

// models
import UserService from '@/_lib/database/models/user'

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

        const user = await UserService.findOne({
          username: credentials?.username,
        })
        if (!user) throw new Error('username:Usuario no encontrado')

        const formattedUser = JSON.parse(JSON.stringify(user)) as UserDataType
        if (formattedUser.password !== credentials?.password)
          throw new Error('password:Contraseña incorrecta')

        return { ...formattedUser }
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      const formattedUser = user as UserDataType
      if (formattedUser) token.user = formattedUser
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
