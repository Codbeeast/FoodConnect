import { initializeApp } from "firebase/app"
import { getMessaging, getToken, onMessage } from "firebase/messaging"

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
import { useAuth } from './hooks/useAuth'
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
      // console.log("✅ FCM token:", fcmToken)
      const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
      // Send token to backend
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

// ✅ Foreground notification listener
export const listenToMessages = (userId: string | null) => {
  const { isAuthenticated } = useAuth()
  console.log("isAuthetcated: ",isAuthenticated)
  onMessage(messaging, (payload) => {
    console.log("🔔 Foreground Message Received:", payload)

    const senderId = payload?.data?.userId
    console.log("senderId: ", senderId)
    console.log("userId: ", userId)
    if (senderId === userId) return // ✅ Ignore if it's from self
    if (!isAuthenticated) return
    if (payload?.notification) {
      const { title, body } = payload.notification
      alert(`${title}: ${body}`)
    }
  })
}
