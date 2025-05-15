import { cert, initializeApp } from 'firebase-admin/app';
import fs from 'fs';
import path from 'path';

let app;

export default async function(req, res) {
  try {
    // Add basic API key protection (recommended)
    const apiKey = req.headers['x-api-key'];
    if (apiKey !== process.env.TOKEN_API_KEY) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // Initialize Firebase Admin if not already initialized
    if (!app) {
      // Option 1: Using environment variables (recommended for production)
      if (process.env.FIREBASE_PROJECT_ID) {
        app = initializeApp({
          credential: cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
          })
        });
      } 
      // Option 2: Using service account file (for development)
      else {
        // This approach works in development but not recommended for production
        const keyFilePath = path.join(process.cwd(), 'accessKey.json');
        if (!fs.existsSync(keyFilePath)) {
          return res.status(500).json({ error: 'Service account file not found' });
        }
        
        const serviceAccount = JSON.parse(fs.readFileSync(keyFilePath, 'utf8'));
        app = initializeApp({
          credential: cert(serviceAccount)
        });
      }
    }
    
    // Get fresh access token
    const token = await app.options.credential.getAccessToken();
    
    // Return token with expiration info
    return res.status(200).json({
      access_token: token.access_token,
      expires_in: token.expires_in,
      expires_at: new Date(Date.now() + token.expires_in * 1000).toISOString()
    });
  } catch (error) {
    console.error('Error generating token:', error);
    return res.status(500).json({ error: error.message });
  }
}