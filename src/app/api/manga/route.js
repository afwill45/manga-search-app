// src/app/api/manga/route.js
import axios from 'axios';
import { NextResponse } from 'next/server';
import { getAccessToken } from '../../../lib/auth';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('query');

  if (!title) {
    return NextResponse.json({ error: 'Missing query parameter' }, { status: 400 });
  }

  try {
    const accessToken = await getAccessToken();
    const baseUrl = 'https://api.mangadex.org';
    const resp = await axios.get(`${baseUrl}/manga`, {
      params: {
        title,
        'includes[]': ['cover_art'],
      },
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return NextResponse.json(resp.data);
  } catch (error) {
    console.error(
      'Error fetching manga search results:',
      error.response ? error.response.data : error.message
    );
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
