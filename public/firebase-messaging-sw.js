// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker
firebase.initializeApp({
 apiKey: "AIzaSyA-49Y2oNxwgWyBecT007CfTRTbdw1x-SQ",
  authDomain: "pwa-demo-c55c8.firebaseapp.com",
  projectId: "pwa-demo-c55c8",
  messagingSenderId: "950508827617",
  appId: "1:950508827617:web:103c4ec28b63a3715918a0"
});

// Retrieve an instance of Firebase Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message', payload);

  const notificationTitle = payload.notification.title || 'Background Message';
  const notificationOptions = {
    body: payload.notification.body || '',
    icon: '/Logo/android/android-launchericon-192-192.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Don't forget to replace placeholder values with your actual Firebase config