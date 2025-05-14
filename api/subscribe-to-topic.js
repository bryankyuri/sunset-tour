// api/subscribe-to-topic.js (Vercel serverless function)
const { initializeApp, cert } = require('firebase-admin/app');
const { getMessaging } = require('firebase-admin/messaging');
require('dotenv').config(); // Make sure this is included

let messaging;

function getFirebaseMessaging() {
  if (!messaging) {
    try {
      const app = initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        })
      });
      messaging = getMessaging(app);
    } catch (error) {
      console.error('Firebase initialization error:', error);
      throw error;
    }
  }
  return messaging;
}

exports.handler = async function(req, res) {
  try {
    const { token, topic } = req.body;
    
    if (!token || !topic) {
      return res.status(400).json({ error: 'Token and topic are required' });
    }
    
    const messaging = getFirebaseMessaging();
    
    // Subscribe the device to the topic
    const response = await messaging.subscribeToTopic(token, topic);
    
    console.log('Successfully subscribed to topic:', response);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error subscribing to topic:', error);
    return res.status(500).json({ error: error.message || 'Failed to subscribe to topic' });
  }
};