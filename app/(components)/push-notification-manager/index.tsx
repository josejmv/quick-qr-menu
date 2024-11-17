'use client'

// main tools
import { useState, useEffect } from 'react'

// utils
import { sendNotification, subscribeUser, unsubscribeUser } from '@/actions'
import { urlBase64ToUint8Array } from './utils'

// types
import type { FC } from 'react'

export const PushNotificationManager: FC = () => {
  const [message, setMessage] = useState('')
  const [isSupported, setIsSupported] = useState(false)
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  )

  /**
   * Check if the browser supports push notifications
   */
  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true)
      registerServiceWorker()
    }
  }, [])

  /**
   * Register the service worker
   */
  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none',
    })
    const sub = await registration.pushManager.getSubscription()
    setSubscription(sub)
  }

  /**
   * Subscribe the user to push notifications
   */
  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    })
    setSubscription(sub)
    if (!sub) {
      throw new Error('Subscription is null')
    }
    const subJson = sub.toJSON()
    if (!subJson.keys) {
      throw new Error('Subscription keys are undefined')
    }
    const convertedSub = {
      endpoint: sub.endpoint,
      expirationTime: sub.expirationTime,
      keys: { auth: subJson.keys.auth, p256dh: subJson.keys.p256dh },
    }
    await subscribeUser(convertedSub)
  }

  /**
   * Unsubscribe the user from push notifications
   */
  async function unsubscribeFromPush() {
    await subscription?.unsubscribe()
    setSubscription(null)
    await unsubscribeUser()
  }

  /**
   * Send a push notification
   */
  async function sendTestNotification() {
    if (subscription) {
      await sendNotification(message)
      setMessage('')
    }
  }

  if (!isSupported)
    return <p>Push notifications are not supported in this browser.</p>

  return (
    <div>
      <h3>Push Notifications</h3>
      {subscription ? (
        <>
          <p>You are subscribed to push notifications.</p>
          <button onClick={unsubscribeFromPush}>Unsubscribe</button>
          <input
            type='text'
            placeholder='Enter notification message'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendTestNotification}>Send Test</button>
        </>
      ) : (
        <>
          <p>You are not subscribed to push notifications.</p>
          <button onClick={subscribeToPush}>Subscribe</button>
        </>
      )}
    </div>
  )
}
