// src/app/manga/[id]/page.js
import axios from 'axios';
import { getAccessToken } from '../../../lib/auth';
import MangaStatistics from '../../../components/MangaStatistics';

export default async function MangaDetail({ params: { id } }) {
  const baseUrl = 'https://api.mangadex.org';

  try {
    const accessToken = await getAccessToken();

    // Fetch manga details including cover_art
    const mangaResp = await axios.get(`${baseUrl}/manga/${id}`, {
      params: { 'includes[]': ['cover_art'] },
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const mangaData = mangaResp.data.data;
    const title =
      mangaData.attributes.title.en ||
      Object.values(mangaData.attributes.title)[0];
    const description =
      mangaData.attributes.description?.en || "No description available.";

    // Fetch manga statistics
    const statResp = await axios.get(`${baseUrl}/statistics/manga/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const statsData = statResp.data.statistics[id];
    const rating = statsData.rating || { average: 'N/A', bayesian: 'N/A' };
    const follows = statsData.follows || 'N/A';

    // Construct cover image URL
    const coverRel = mangaData.relationships.find(
      (rel) => rel.type === 'cover_art'
    );
    const coverUrl = coverRel
      ? `https://uploads.mangadex.org/covers/${id}/${coverRel.attributes.fileName}`
      : null;

    return (
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        {coverUrl && (
          <img
            src={coverUrl}
            alt={`${title} Cover`}
            className="mb-4 max-w-full h-auto rounded"
          />
        )}
        <p className="mb-4">{description}</p>
        <MangaStatistics rating={rating} follows={follows} />
      </div>
    );
  } catch (error) {
    console.error(
      'Error fetching manga details:',
      error.response ? error.response.data : error.message
    );
    return (
      <div className="max-w-4xl mx-auto p-4">
        <p className="text-red-500">
          Error: Failed to fetch manga details
        </p>
      </div>
    );
  }
}
