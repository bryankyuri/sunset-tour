// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyA-49Y2oNxwgWyBecT007CfTRTbdw1x-SQ",
  authDomain: "pwa-demo-c55c8.firebaseapp.com",
  projectId: "pwa-demo-c55c8",
  messagingSenderId: "950508827617",
  appId: "1:950508827617:web:103c4ec28b63a3715918a0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Request permission and get token
export const requestNotificationPermission = async () => {
  try {
    console.log("Requesting notification permission...");
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      console.log("Notification permission granted.");

      // Let Firebase handle service worker registration internally
      const token = await getToken(messaging, {
        vapidKey:
          "BJVbTsv4fOtJ1OYg8dwgKq9NK5Z-k7STZTlU2g3B0wnlQ4M0uSKPYtKaxW9HZr-JfvgQ5WulfYRoGi7HkP6e7Mw",
      });

      console.log("FCM Token:", token);
      localStorage.setItem("fcmToken", token);

      // Try to subscribe to topic (will be skipped in development)
      await subscribeToAllUsersTopic(token);

      return token;
    } else {
      console.log("Notification permission denied");
      return null;
    }
  } catch (error) {
    console.error("Error getting permission:", error);
    throw error;
  }
};

// Subscribe token to all-users topic
export const subscribeToAllUsersTopic = async (token) => {
  try {
    // Check if we're in development
    const isDev = import.meta.env.DEV;
    
    if (isDev) {
      // In development, just log and return success
      console.log('[DEV] Would subscribe token to all-users topic:', token);
      return true;
    }
    
    // In production, call the API endpoint
    const response = await fetch('/api/subscribe-to-topic', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token })
    });
    
    // Check if the request was successful
    if (response.ok) {
      const result = await response.json();
      console.log('Successfully subscribed to all-users topic');
      return true;
    } else {
      console.error('Failed to subscribe to topic:', await response.text());
      return false;
    }
  } catch (error) {
    console.error('Error subscribing to topic:', error);
    return false;
  }
};

// Handle foreground messages
export const setupMessaging = () => {
  onMessage(messaging, (payload) => {
    console.log("Foreground message received:", payload);

    // Display notification even when app is in foreground
    const title = payload.notification?.title || "New Notification";
    const options = {
      body: payload.notification?.body || "",
      icon: "/logo192.png",
    };

    new Notification(title, options);
  });
};
