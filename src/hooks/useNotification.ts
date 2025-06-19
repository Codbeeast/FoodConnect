import { useEffect } from 'react'
import { messaging } from '../firebase'
import { getToken, onMessage } from 'firebase/messaging'

export const useNotifications = () => {
  useEffect(() => {
    const request = async () => {
      try {
        const token = await getToken(messaging, {
          vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
        })

        if (token) {
          localStorage.setItem('fcm_token', token)
          console.log('✅ FCM Token:', token)
        }
      } catch (err) {
        console.error('❌ FCM Error:', err)
      }
    }

    request()

    onMessage(messaging, (payload) => {
      alert(`${payload.notification?.title}: ${payload.notification?.body}`)
    })
  }, [])
}
