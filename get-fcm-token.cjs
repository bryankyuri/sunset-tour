// get-token-direct.cjs
const { GoogleAuth } = require('google-auth-library');
const fs = require('fs');
const path = require('path');

// Path to your service account key file
const keyFilePath = path.join(__dirname, '');

async function getAccessToken() {
  try {
    // Check if file exists first
    if (!fs.existsSync(keyFilePath)) {
      console.error(`Service account file not found at: ${keyFilePath}`);
      console.error('Please make sure you have placed your Firebase service account JSON file at this location.');
      return;
    }
    
    // Parse service account file
    const serviceAccountJson = JSON.parse(fs.readFileSync(keyFilePath, 'utf8'));
    console.log(`Using service account: ${serviceAccountJson.client_email}`);
    
    // Create auth client
    const auth = new GoogleAuth({
      credentials: serviceAccountJson,
      scopes: ['https://www.googleapis.com/auth/firebase.messaging']
    });
    
    // Get client and token
    const client = await auth.getClient();
    const token = await client.getAccessToken();
    
    console.log('\nFCM Access Token:');
    console.log(token.token); // Note: the token is in .token property, not .access_token
    console.log('\nExpires at:', new Date(token.expiry_date).toLocaleTimeString());
    console.log('\nUse this token in Postman as your fcm_access_token variable');
    
    // Copy to clipboard if possible
    try {
      // Only works on some systems
      require('child_process').execSync(`echo ${token.token} | clip`);
      console.log('\nToken copied to clipboard!');
    } catch (err) {
      // Silently fail if clipboard access isn't available
    }
    
    return token.token;
  } catch (error) {
    console.error('Error details:');
    
    if (error.response && error.response.data) {
      console.error(JSON.stringify(error.response.data, null, 2));
    }
    
    console.error('\nPossible solutions:');
    console.error('1. Verify your service account key file is valid and not corrupted');
    console.error('2. Make sure the service account has the Firebase Messaging Admin role');
    console.error('3. Check if the service account has been disabled');
    console.error('4. Try creating a new service account key in Firebase Console');
    
    throw error;
  }
}

getAccessToken().catch(error => {
  console.error('Failed to get access token:', error.message);
  process.exit(1);
});