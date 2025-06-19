// This file is required to receive push notifications in the browser
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js')

firebase.initializeApp({
   apiKey: "AIzaSyC1ZXWc_UT1m67ccul_Jxb0SyvzOXTfLj4",
  authDomain: "foodconnect-e9bca.firebaseapp.com",
  projectId: "foodconnect-e9bca",
  messagingSenderId:"58529824612",
  appId:"1:58529824612:web:35aaed18a0814ed7f64471"
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload)
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo.png',
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
