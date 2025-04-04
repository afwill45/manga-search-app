// src/components/SearchForm.js
'use client';
import { useState } from 'react';
import MangaCard from './MangaCard';

export default function SearchForm() {
  const [query, setQuery] = useState('');
  const [mangaList, setMangaList] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch(`/api/manga?query=${encodeURIComponent(query)}`);
      if (!res.ok) {
        throw new Error('Error fetching manga data');
      }
      const data = await res.json();
      setMangaList(data.data || []);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search for manga..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Search
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {mangaList.map((manga) => (
          <MangaCard key={manga.id} manga={manga} />
        ))}
      </div>
    </div>
  );
}
