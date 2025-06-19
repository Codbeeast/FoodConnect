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

const app = initializeApp(firebaseConfig)
export const messaging = getMessaging(app)

export const requestPermissionAndGetToken = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    })
    return token
  } catch (error) {
    console.error("❌ Error getting FCM token", error)
    return null
  }
}

export const listenToMessages = () => {
  onMessage(messaging, (payload) => {
    console.log("🔔 Foreground Message Received:", payload)
    alert(`${payload.notification?.title}: ${payload.notification?.body}`)
  })
}
