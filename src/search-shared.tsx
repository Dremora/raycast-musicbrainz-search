import { Action, ActionPanel, List } from '@raycast/api';
import { usePromise } from '@raycast/utils';
import { useState } from 'react';

export default function SearchShared({
  search,
  buildUrl,
}: {
  search: (
    searchText: string,
    page: number,
  ) => Promise<{
    data: {
      page: number;
      id: string;
      title: string;
      subtitle: string;
    }[];
    hasMore: boolean;
  }>;
  buildUrl: (id: string) => string;
}) {
  const [searchText, setSearchText] = useState('');

  const { isLoading, data, pagination } = usePromise(
    (searchText: string) =>
      async ({ page }) => {
        if (!searchText) {
          return { data: [], hasMore: false };
        }

        return await search(searchText, page);
      },
    [searchText],
  );

  return (
    <List
      isLoading={isLoading}
      filtering={false}
      navigationTitle="Search MusicBrainz"
      searchBarPlaceholder="Search for artists, releases, recordings, works, labels, areas, places, and events"
      onSearchTextChange={setSearchText}
      pagination={pagination}
    >
      {data?.map((item) => (
        <List.Item
          key={`${item.page}-${item.id}`}
          title={item.title}
          subtitle={item.subtitle}
          actions={
            <ActionPanel>
              <Action.OpenInBrowser url={buildUrl(item.id)} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
