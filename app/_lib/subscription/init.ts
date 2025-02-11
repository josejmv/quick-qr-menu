// main tools
import PusherServer from 'pusher'

export const pusherServer = new PusherServer({
  useTLS: true,
  cluster: 'us2',
  appId: process.env.NEXT_PUBLIC_SUBSCRIPTION_APP_ID as string,
  key: process.env.NEXT_PUBLIC_SUBSCRIPTION_PUBLIC_KEY as string,
  secret: process.env.NEXT_PUBLIC_SUBSCRIPTION_SECRET_KEY as string,
})
