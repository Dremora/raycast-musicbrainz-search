import { useCallback } from 'react';
import SearchShared from './search-shared';
import {
  getYearFromReleaseDate,
  searchLimit,
  searchRecordings,
} from './musicbrainz';

export default function Command() {
  const search = useCallback(async (searchText: string, page: number) => {
    const data = await searchRecordings(searchText, page);

    const artists = data.recordings.map((recording) => {
      const releaseYear = getYearFromReleaseDate(
        // @ts-expect-error not defined in the npm package
        recording['first-release-date'],
      );

      return {
        id: recording.id,
        title: `${recording.title}${releaseYear ? ` (${releaseYear})` : ''}`,
        subtitle:
          recording['artist-credit']
            ?.map((credit) => credit.name + (credit.joinphrase ?? ''))
            .join('') ?? '',
        page,
      };
    });

    return { data: artists, page, hasMore: data.count > searchLimit };
  }, []);

  const buildUrl = useCallback((id: string) => {
    return `https://musicbrainz.org/recording/${id}`;
  }, []);

  return (
    <SearchShared
      search={search}
      buildUrl={buildUrl}
      placeholder={'Search for recordings, like "Tomorrow Never Knows"...'}
    />
  );
}
