// api/subscribe-to-topic.js (Vercel serverless function)
import { initializeApp } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';

let messaging;
function getFirebaseMessaging() {
  if (!messaging) {
    const app = initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      })
    });
    messaging = getMessaging(app);
  }
  return messaging;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ error: 'Token is required' });
    }

    // Subscribe token to a topic
    const messaging = getFirebaseMessaging();
    await messaging.subscribeToTopic([token], 'all-users');
    
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error subscribing to topic:', error);
    return res.status(500).json({ error: error.message });
  }
}