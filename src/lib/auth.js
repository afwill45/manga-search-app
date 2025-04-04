// lib/auth.js
import axios from 'axios';
import qs from 'qs';

export async function getAccessToken() {
  const creds = {
    grant_type: 'password',
    username: process.env.MANGADEX_USERNAME,
    password: process.env.MANGADEX_PASSWORD,
    client_id: process.env.MANGADEX_CLIENT_ID,
    client_secret: process.env.MANGADEX_CLIENT_SECRET,
  };

  try {
    const response = await axios.post(
      'https://auth.mangadex.org/realms/mangadex/protocol/openid-connect/token',
      qs.stringify(creds),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );
    const token = response.data.access_token;
    console.log('Access token obtained:', token ? token.slice(0, 20) + '...' : 'No token');
    return token;
  } catch (error) {
    console.error('Error getting access token:', error.response ? error.response.data : error.message);
    throw new Error('Failed to get access token');
  }
}
