import { useCallback } from 'react';
import SearchShared from './search-shared';
import { searchArtists, searchLimit } from './musicbrainz';

export default function Command() {
  const search = useCallback(async (searchText: string, page: number) => {
    const data = await searchArtists(searchText, page);

    const artists = data.artists.map((artist) => ({
      id: artist.id,
      title: artist.name,
      subtitle: artist.disambiguation,
      page,
    }));

    return { data: artists, page, hasMore: data.count > searchLimit };
  }, []);

  const buildUrl = useCallback((id: string) => {
    return `https://musicbrainz.org/artist/${id}`;
  }, []);

  return <SearchShared search={search} buildUrl={buildUrl} />;
}
