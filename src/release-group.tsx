import { useCallback } from 'react';
import SearchShared from './search-shared';
import { searchReleaseGroups, searchLimit } from './musicbrainz';

export default function Command() {
  const search = useCallback(async (searchText: string, page: number) => {
    const data = await searchReleaseGroups(searchText, page);

    const artists = data['release-groups'].map((releaseGroup) => {
      const releaseYear =
        releaseGroup['first-release-date']?.split('-')?.[0] ?? '';

      return {
        id: releaseGroup.id,
        title: `${releaseGroup.title}${releaseYear ? ` (${releaseYear})` : ''}`,
        subtitle: releaseGroup['artist-credit']
          .map((credit) => credit.name + (credit.joinphrase ?? ''))
          .join(''),
        page,
      };
    });

    return { data: artists, page, hasMore: data.count > searchLimit };
  }, []);

  const buildUrl = useCallback((id: string) => {
    return `https://musicbrainz.org/release-group/${id}`;
  }, []);

  return (
    <SearchShared
      search={search}
      buildUrl={buildUrl}
      placeholder={'Search for release groups, like "Abbey Road"...'}
    />
  );
}
