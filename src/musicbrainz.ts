import { MusicBrainzApi } from 'musicbrainz-api';

export const searchLimit = 25;

export const musicBrainzAPI = new MusicBrainzApi({
  appName: 'raycast-musicbrainz-search',
  appVersion: '0.1.0',
  appContactInfo: 'user@mail.org',
  botAccount: {},
});

export async function searchArtists(query: string, pageIndex: number) {
  return await musicBrainzAPI.search('artist', {
    query,
    limit: searchLimit,
    offset: pageIndex * searchLimit,
  });
}

export async function searchReleaseGroups(query: string, pageIndex: number) {
  return await musicBrainzAPI.search('release-group', {
    query,
    limit: searchLimit,
    offset: pageIndex * searchLimit,
  });
}
