export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/:path*/dashboard', '/crear-negocio', '/mis-negocios'],
}
