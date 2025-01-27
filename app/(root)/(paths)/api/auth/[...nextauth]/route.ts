// main tools
import { axiosInstance } from '@/_lib/axios-instance'
import NextAuth from 'next-auth'

// providers
import CustomProvider from 'next-auth/providers/credentials'

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
        const { data } = await axiosInstance.post<UserDataType>(
          '/api/user/get-by-username',
          { username: credentials?.username }
        )

        if (!data._id) throw new Error('username:Usuario no encontrado')
        if (data.password !== credentials?.password)
          throw new Error('password:Contraseña incorrecta')

        return { ...data }
      },
    }),

    CustomProvider({
      id: 'signup',
      name: 'signup',
      credentials: {
        username: { type: 'text' },
        password: { type: 'password' },
        confirmPassword: { type: 'password' },
      },
      authorize: async (credentials) => {
        const { data } = await axiosInstance.post<
          UserDataType & { error: string }
        >('/api/user/register', {
          username: credentials?.username,
          password: credentials?.password,
        })

        console.log(data)

        if (!data._id) throw new Error(data.error)

        return { ...data }
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
