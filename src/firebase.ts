import { initializeApp } from "firebase/app"
import { getMessaging, getToken, onMessage } from "firebase/messaging"
import toast from 'react-hot-toast'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
}

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig)
export const messaging = getMessaging(app)

// ✅ Normal async function to request permission and send token
export const requestPermissionAndGetToken = async (userId: string | null) => {

  try {
    const permission = await Notification.requestPermission()
    if (permission !== "granted") {
      console.warn("🔕 Notification permission not granted")
      return null
    }

    const fcmToken = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    })

    if (fcmToken) {
      const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

      await fetch(`${baseURL}/api/save-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, token: fcmToken }),
      })

      return fcmToken
    } else {
      console.warn("⚠️ FCM token is null")
      return null
    }
  } catch (error) {
    console.error("❌ Error getting FCM token", error)
    return null
  }
}
export const listenToMessages = (userId: string | null, isAuthenticated: boolean) => {
  onMessage(messaging, (payload) => {
    const senderId = payload?.data?.userId
    if (!isAuthenticated) return
    if (senderId === userId) return
    if (payload?.notification) {
      const { title, body } = payload.notification

      toast.success(`${title}: ${body}`, {
        duration: 5000,
        position: 'top-right',
        icon: '📢',
        style: {
          border: '1px solid #4ade80',
          padding: '16px',
          color: '#16a34a',
        }
      })
    }
  })
}
